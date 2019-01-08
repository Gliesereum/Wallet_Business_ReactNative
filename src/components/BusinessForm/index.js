// @flow
import React, { Component } from "react";
import {
  Text,
  Button,
  Item,
  Label,
  Input,
  Form
} from "native-base";




type Props = {
  isNew?: Boolean,
  business?: Object,
  onSubmit: Function
}

const fields = [
  { label: "Название", key: "name" },
  { label: "Описание", key: "description" },
  { label: "ЭДРПОУ, 8 символов", key: "edrpou" },
  { label: "Адрес", key: "address" }
];


class BusinessForm extends Component<Props, {}> {

  state = {
    data: {}
  };

  componentWillMount() {
    this.initForm();
  }

  initForm = () => {
    const { isNew, business } = this.props;
    if (isNew) {
      return;
    }
    this.setState(state => ({ ...state, data: business }));
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
        <Input value={value} onChangeText={text => onInput(item.key, text)}/>
      </Item>
    );
  };

  render() {
    const buttonTitle = this.props.isNew ? "Создать" : "Сохранить";
    return (
      <Form>
        {fields.map(this.renderItemInput)}
        <Button block style={{ margin: 15, marginTop: 25 }} onPress={this.submitHandler}>
          <Text>{buttonTitle}</Text>
        </Button>
      </Form>
    );
  }
}

export default BusinessForm;
