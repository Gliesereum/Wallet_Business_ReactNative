// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Item, Left, Right, Label, ListItem, Button } from "native-base";

import Field from "./children/Field";


const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

const fields = {
  corporationServiceId: {
    inputKey: "corporationServiceId",
    label: "ID",
    defaultValue: "",
    render: false,
    type: "text"
  },
  name: { inputKey: "name", label: "Название:", defaultValue: "", render: true, type: "text" },
  discount: { inputKey: "discount", label: "Скидка, %:", defaultValue: 0, render: true, type: "number" },
  duration: {
    inputKey: "duration",
    label: "Продолжительность, минуты:",
    defaultValue: 0,
    render: true,
    type: "number"
  },
  services: { inputKey: "services", label: "Услуги:", defaultValue: [], type: "array", render: false },
  servicesIds: { inputKey: "servicesIds", label: "Услуги", defaultValue: [], render: true, type: "array" }
};

type Props = {
  packageService?: Object,
  corporationServiceId?: String,
  services: Array,
  onSubmit: Function,
};


class PackageForm extends Component<Props, {}> {

  state = { data: {} };

  componentDidMount() {
    this._initForm();
  }

  _initForm = () => {
    const { packageService, services, corporationServiceId } = this.props;
    const newPackage = !packageService && services;
    const updatePackage = packageService && services;
    if (newPackage) {
      const services = packageService.services.map(service => service.id);
      this.setState(({ data }) => ({ data: { ...packageService, services } }));
      return;
    }
    if (updatePackage) {
      const dataFromFields = this.objToStateObj(fields);
      const services = [];
      const servicesIds = packageService.services.map(item => item.id);
      this.setState(({ data }) => ({
        data: {
          ...dataFromFields, ...packageService,
          corporationServiceId,
          services,
          servicesIds
        }
      }));
    }
  };

  _onInput = (key, value) => {
    this.setState(({ data }) => ({ data: { ...data, [key]: value } }));
  };

  _submitHandler = () => {
    this.props.onSubmit(this.state.data);
  };

  objToStateObj = obj => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = obj[key].defaultValue || "";
      return acc;
    }, {});
  };

  priceValue = () => {
    const { servicesIds, discount } = this.state.data;
    if (!servicesIds) {
      return 0;
    }
    const selectedPrices = this.state.data.servicesIds ? this.props.services.filter(item => this.state.data.servicesIds.includes(item.id)) : [];
    const generalPrice = selectedPrices.map(item => item.price).reduce((a, b) => a + b);
    const discountPrice = generalPrice - (generalPrice * discount / 100);
    return discountPrice;
  };

  renderPriceInfo = () => {
    const price = this.priceValue();
    console.log(price);
    return (
      <ListItem>
        <Left><Text>Общая стоимость:</Text></Left>
        <Right><Text>{price} грн.</Text></Right>
      </ListItem>
    );
  };

  renderItemField = fieldKey => {
    const field = fields[fieldKey];
    const value = this.state.data[field.inputKey];
    const options = field.inputKey === "servicesIds" ? this.props.services : null;
    return field.render && (
      <Field
        type={field.type}
        value={value}
        key={fieldKey}
        onChange={this._onInput}
        label={field.label}
        options={options}
        inputKey={fieldKey}
      />
    );
  };

  renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>Вы не можете создать пакет услуг, так как мойка не содержит услуги. Добавьте парочку.</Text>
      </View>
    );
  };

  renderForm = () => {
    const formFields = Object.keys(fields).map(this.renderItemField);
    return (
      <View style={styles.container}>
        {formFields}
        {this.renderPriceInfo()}
        <Button block style={{ margin: 15, marginTop: 25 }} onPress={this._submitHandler}>
          <Text>Сохранить</Text>
        </Button>
      </View>
    );
  };

  render() {
    // console.log(this.state);
    return this.props.services ? this.renderForm() : this.renderEmptyList();
  }

}


export default PackageForm;
