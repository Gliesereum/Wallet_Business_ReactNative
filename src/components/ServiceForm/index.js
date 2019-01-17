// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { View, Button, Text } from "native-base";

import { asyncRequestAuth } from "../../utils";

import PriceInput from "./children/Input";
import ClassForm from "./children/ClassForm";

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});


type Props = {
  onSubmit: Function,
  onFullSubmit: Function,
  servicePrice?: Object,
  businessServiceId: String,
  isNew?: Boolean
};

type Price = {
  name: String,
  description: String,
  price: Number,
  serviceId: String,            // UUID
  businessServiceId: String,    // UUID
  duration: Number,             // Minutes
  serviceClass: Array<String>,  // UUID
  interiorTypes: Array<String>, //
  carBodies: Array<String>      //
};


const interiorTypes = [
  { SUEDE: "Замша" },
  { TEXTILE: "Текстиль" },
  { LEATHER: "Кожа" },
  { ARTIFICIAL_LEATHER: "Искусственная кожа" },
  { ALCANTARA: "Алькантара" },
  { TASKANA: "Таскана" },
  { VELOURS: "Велюр" }
];

const carBodies = [
  { SEDAN: "Седан" },
  { WAGON: "Универсал" },
  { HATCHBACK: "Хетчбек" },
  { LIFTBACK: "Лифтбек" },
  { LIMOUSINE: "Лимузин" },
  { MINIVAN: "Минивен" },
  { COUPE: "Купе" },
  { CABRIOLET: "Кабриолет" },
  { CROSSOVER: "Кроссовер" },
  { SUV: "Джип" }
];

const renderFields = {
  corporationServiceId: { label: "Бизнес:", type: "string", defaultValue: "", render: false },
  serviceId: { label: "Вид Услуги:", type: "select", defaultValue: "", render: true },
  name: { label: "Название:", key: "name", type: "string", defaultValue: "", render: true },
  description: { label: "Описание:", type: "string", defaultValue: "", render: true },
  price: { label: "Цена, ГРН:", type: "number", defaultValue: "", render: true },
  duration: { label: "Продолжительность, минуты:", type: "number", defaultValue: "", render: true },
  interiorTypes: { label: "Салон:", type: "array", defaultValue: [], render: true },
  carBodies: { label: "Кузов:", type: "array", defaultValue: [], render: true },
  serviceClass: { label: "Класс обслуживания:", type: "string", defaultValue: [], render: false }
};


class ServicePrice extends Component<Props, {}> {

  state = {
    data: {},
    options: {
      interiorTypes: [],
      carBodies: [],
      serviceId: [],
      serviceClass: []
    },
    errors: {},
    showClassForm: false
  };

  componentDidMount() {
    this._initForm();
    this._loadServices();
    this._loadClasses();
  }

  _initForm = () => {
    const { isNew, servicePrice, corporationServiceId } = this.props;
    this.setState((state) => ({
      data: { ...this.state.data, corporationServiceId },
      options: { ...this.state.options, carBodies, interiorTypes }
    }));
    if (isNew) {
      this.setState(({ data }) => ({ data: { ...this.objToStateObj(renderFields), ...data } }));
      return;
    }
    this.setState(({ data }) => ({ data: { ...this.objToStateObj(renderFields), ...servicePrice } }));
  };

  _loadServices = async () => {
    const url = "service";
    try {
      const servicesOptions = await asyncRequestAuth(url) || [];
      this.setState(({ options }) => ({
        options: {
          ...this.state.options,
          serviceId: servicesOptions
        }
      }));
    } catch (e) {

    }
  };

  _loadClasses = async () => {
    const url = "class";
    try {
      const classOptions = await asyncRequestAuth(url) || [];
      this.setState(({ options }) => ({
        options: {
          ...this.state.options,
          serviceClass: classOptions
        }
      }));
    } catch (e) {

    }
  };

  _pushClassToPriceHandler = async priceClass => {
    const url = "price/class";
    const body = { priceId: this.state.data.id, serviceClassId: priceClass.id };
    try {
      const newPriceClass = await asyncRequestAuth(url, "POST", "karma", body);
      await this.setState(({ data }) => ({
        data: { ...data, serviceClass: [...data.serviceClass, priceClass] }
      }));
    } catch (e) {
      const error = e;

    }
  };

  _removeClassFromPriceHandler = async priceClass => {
    const { id: servicePriceId } = this.state.data;
    const url = `price/class/${servicePriceId}/${priceClass.id}`;
    this.setState(({ data }) => ({
      data: {
        ...data,
        serviceClass: data.serviceClass.filter(item => item.id !== priceClass.id)
      }
    }));
    try {
      await asyncRequestAuth(url, "DELETE");
    } catch (e) {
      const error = e;

    }
  };

  objToStateObj = obj => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = obj[key].defaultValue || "";
      return acc;
    }, {});
  };

  onInput = (key, value) => {
    this.setState(({ data }) => ({ data: { ...data, [key]: value } }));
  };

  _onSubmit = async () => {
    try {
      const newPrice = await this.props.onSubmit(this.state.data);
      await this.setState(({ data }) => ({ data: newPrice }));
      await this.setState(({ showClassForm }) => ({ showClassForm: true }));
      // debugger;
    } catch (e) {
      const error = e;
      //
    }
  };

  _fullSubmitHandler = () => {
    // this.setState(({ showClassForm }) => ({ showClassForm: !showClassForm }));
    this.setState(({ showClassForm }) => ({ showClassForm: false }));
    this.props.onFullSubmit(this.state.data);
  };

  renderItemInput = key => {
    const { data, options, errors } = this.state;
    const field = renderFields[key];
    return field.render && (
      <PriceInput
        type={field.type}
        label={field.label}
        inputKey={key}
        onChange={this.onInput}
        value={data[key]}
        options={options[key]}
        error={errors[key]}
      />
    );
  };

  render() {
    const keys = Object.keys(renderFields);
    return (
      <View style={styles.container}>
        {keys.map(this.renderItemInput)}
        <Button
          style={{ width: "100%", marginTop: 4, justifyContent: "center" }}
          onPress={this._onSubmit}
        >
          <Text>Далее</Text>
        </Button>
        <ClassForm
          isOpen={this.state.showClassForm}
          onModalClosed={e => console.log("Close Form")}
          onAddClassToPrice={this._pushClassToPriceHandler}
          onRemoveClassFromPrice={this._removeClassFromPriceHandler}
          servicePrice={this.state.data}
          serviceClass={this.state.options["serviceClass"]}
          onFullSubmit={this._fullSubmitHandler}
        />
      </View>
    );
  }

}


export default connect(state => ({ business: state.auth.user.business }))(ServicePrice);
