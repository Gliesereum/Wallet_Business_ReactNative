// @flow
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Form, Input, Item, Label, Text, View } from "native-base";
import {withNavigation} from 'react-navigation';

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


class CarWashFrom extends Component<Props, {}> {

  initEmptyForm = () => {
    return fields.reduce((form, field) => {
      form[field.key] = "";
      return form;
    }, {});
  };

  state = { data: this.initEmptyForm() };

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

  submitHandler = () => {
    this.props.onSubmit(this.state.data);
  };

  renderItemInput = (item) => {
    const { onInput } = this;
    const value = this.state.data[item.key];
    return (
      <Item floatingLabel key={item.key}>
        <Label style={{ paddingTop: 4 }}>{item.label}</Label>
        <Input
          value={value.toString()}
          onChangeText={text => onInput(item.key, text)}
          keyboardType={item.type || "default"}
        />
      </Item>
    );
  };

  renderForm = () => {
    const fieldsForm = fields.map(this.renderItemInput);
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
    console.log(this.state.data);
    return this.renderForm();
  }

}


export default withNavigation(CarWashFrom);
