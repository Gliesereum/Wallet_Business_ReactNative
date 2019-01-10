// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import { View, Button, Text } from "native-base";

import { asyncRequestAuth } from "../../utils";

import PriceInput from "./children/Input";

const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});


type Props = {
  onSubmit: Function,
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
  businessServiceId: { label: "Бизнес:", type: "string", defaultValue: "", render: false },
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
  }

  _initForm = () => {
    const { isNew, servicePrice, businessServiceId } = this.props;
    this.setState((state) => ({
      data: { ...this.state.data, businessServiceId },
      options: { ...this.state.options, carBodies, interiorTypes }
    }));
    if (isNew) {
      this.setState(({ data }) => ({ data: { ...this.objToStateObj(renderFields), ...data } }));
      return;
    }
    this.setState(({ data }) => ({ data: servicePrice }));
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
      debugger;
    } catch (e) {
      const error = e;
      debugger;
    }
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
    console.log(this.state);
    return (
      <View style={styles.container}>
        {keys.map(this.renderItemInput)}
        <Button
          style={{ width: "100%", marginTop: 8 }}
          onPress={this._onSubmit}
        >
          <Text style={{ textAlign: "center" }}>Сохранить</Text>
        </Button>
      </View>
    );
  }

}


export default connect(state => ({ business: state.auth.user.business }))(ServicePrice);
