// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Form, Input, Item, Label, Text, View, Icon } from "native-base";
import { withNavigation } from "react-navigation";

const styles = StyleSheet.create({});

type Props = {
  onSubmit: Function,
  type: "new" | "update",
  carWashData?: Object
};


const fields = [
  { label: "Название", key: "name" },
  { label: "Телефон", key: "phone", type: "numeric" },
  { label: "Описание", key: "description" },
  { label: "Адрес", key: "address" },
  { label: "Долгота, -180 - 180", key: "latitude" },
  { label: "Ширина, -180 - 180", key: "longitude", type: "numeric" }
];

const fieldsRender = [
  { label: "Название", key: "name", type: "text" },
  { label: "Телефон", key: "phone", type: "numeric" },
  { label: "Описание", key: "description", type: "text" },
  { label: "Адрес", key: "address", type: "map" }
];


class CarWashFrom extends Component<Props, {}> {

  initEmptyForm = () => {
    return fields.reduce((form, field) => {
      form[field.key] = "";
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

  errorHandler = ({ additional }) => {
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

  renderItemInput = (item) => {
    const { onInput } = this;
    const value = this.state.data[item.key];
    const error = this.state.error[item.key];
    const mapField = (
      <Item floatingLabel key={item.key} error={!!error}>
        <Label style={{ paddingTop: 4 }}>{item.label}</Label>
        <Input
          value={value.toString()}
          onChangeText={text => onInput(item.key, text)}
          keyboardType={item.type || "default"}
          onFocus={this._openMapScreen}
        />
      </Item>
    );
    if (item.type === "map") {
      return mapField;
    }
    return (
      <Item floatingLabel key={item.key} error={!!error}>
        <Label style={{ paddingTop: 4 }}>{item.label}</Label>
        <Input
          value={value.toString()}
          onChangeText={text => onInput(item.key, text)}
          keyboardType={item.type || "default"}
        />
        {error && <Icon name='close-circle' />}
      </Item>
    );
  };


  renderForm = () => {
    const fieldsForm = fieldsRender.map(this.renderItemInput);
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
    return this.renderForm();
  }

}


export default withNavigation(CarWashFrom);
