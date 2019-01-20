// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Form, Input, Item, Label, Text, View } from "native-base";
import { withNavigation } from "react-navigation";

import Field from "./children/Field";

const styles = StyleSheet.create({});

type Props = {
  onSubmit: Function,
  type: "new" | "update",
  carWashData?: Object,
  corporation: Array
};


const fields = {
  corporationId: { key: "corporationId", label: "Компания", type: "select", render: true, defaultValue: "" },
  name: { key: "name", label: "Название:", type: "string", render: true, defaultValue: "" },
  phone: { key: "phone", label: "Телефон:", type: "number", render: true, defaultValue: "" },
  description: { key: "description", label: "Описание:", type: "string", render: true, defaultValue: "" },
  address: { key: "address", label: "Адрес", type: "map", render: true, defaultValue: "" },
  latitude: { key: "latitude", label: "Название", type: "string", render: false, defaultValue: "" },
  longitude: { key: "longitude", label: "Название", type: "string", render: false, defaultValue: "" }
};


class CarWashFrom extends Component<Props, {}> {

  initEmptyForm = () => {
    const fieldsList = Object.keys(fields);
    return fieldsList.reduce((form, key) => {
      form[key] = fields[key].defaultValue || "";
      return form;
    }, {});
  };

  state = { data: this.initEmptyForm(), error: {} };

  componentDidMount() {
    this.fillForm();
  }

  fillForm = () => {
    const carWashData = this.props.carWashData;
    this.setState(state => ({
      ...state,
      data: {
        ...state.data,
        ...carWashData
      }
    }));
  };

  onInput = (key, value) => {
    this.setState(state => ({ ...state, data: { ...state.data, [key]: value } }));
  };

  errorHandler = (e) => {
    const { additional } = e;
    const error = e;
    this.setState(state => ({ ...state, error: additional }));
  };

  submitHandler = () => {
    this.props.onSubmit(this.state.data).then().catch(this.errorHandler);
  };

  _locationSubmit = ({ location, address }) => {
    this.onInput("latitude", location.latitude);
    this.onInput("longitude", location.longitude);
    this.onInput("address", address);
  };

  _openMapScreen = () => {
    this.props.navigation.navigate("AddressInfo", {
        address: this.state.data.address,
        location: {
          latitude: this.state.data.latitude,
          longitude: this.state.data.longitude
        },
        onSubmit: this._locationSubmit
      }
    );
  };

  renderItemInput = key => {
    const { onInput } = this;
    const field = fields[key];
    const value = this.state.data[field.key];
    const error = this.state.error[field.key];
    const options = field.key === "corporationId" ? this.props.corporation : null;
    const mapField = (
      <Item fixedLabel key={key} error={!!error}>
        <Label style={{ paddingTop: 4 }}>{field.label}</Label>
        <Input
          value={value.toString()}
          onChangeText={text => onInput(field.key, text)}
          keyboardType={field.type || "default"}
          onFocus={this._openMapScreen}
        />
      </Item>
    );
    if (field.type === "map") {
      return mapField;
    }
    return field.render && (
      <Field
        type={field.type}
        label={field.label}
        inputKey={field.key}
        value={value}
        onChange={onInput}
        options={options}
      />
    );
  };

  renderForm = () => {
    const fieldsList = Object.keys(fields);
    const fieldsForm = fieldsList.map(this.renderItemInput);
    const submitButtonTitle = this.props.type === "new" ? "Создать" : "Сохранить";
    return (
      <View>
        <Form>
          {fieldsForm}
        </Form>
        <Button
          style={{ marginLeft: 5, marginRight: 5, marginTop: 10 }}
          onPress={() => this.submitHandler()}
          full
          block
        >
          <Text>{submitButtonTitle}</Text>
        </Button>
      </View>
    );
  };

  render() {
    console.log(this.state);
    return this.renderForm();
  }

}


export default withNavigation(CarWashFrom);
