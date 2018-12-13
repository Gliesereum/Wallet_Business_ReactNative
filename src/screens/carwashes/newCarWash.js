import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Form, Label, Input, Item } from "native-base";

import { HeaderLayout } from "../../components/Layout";
import { asyncRequestTest } from "../../utils";

const days = [
  {}
];


const fields = [
  { label: "Название", key: "name" },
  { label: "Количество боксов, число", key: "name", type: "numeric" },
  { label: "Описание", key: "description" },
  { label: "Адрес", key: "address" },
  { label: "Долгота, -180 - 180", key: "latitude" },
  { label: "Ширина, -180 - 180", key: "longitude", type: "numeric" }
];


class NewCarWash extends Component {

  state = { data: {} };

  componentWillMount() {
  }

  onInput = (key, value) => {
    this.setState(state => ({ ...state, data: { ...state.data, [key]: value } }));
  };

  onSubmit = async () => {
    const url = "";
    const token = this.props.auth.token;
    try {
      const newWash = await asyncRequestTest(url, "POST", token);
    } catch (e) {

    }
  };

  renderItemInput = (item) => {
    const { onInput } = this;
    const value = this.state.data[item.key];
    return (
      <Item floatingLabel key={item.key}>
        <Label style={{ paddingTop: 4 }}>{item.label}</Label>
        <Input
          value={value}
          onChangeText={text => onInput(item.key, text)}
          keyboardType={item.type || "default"}
        />
      </Item>
    );
  };

  renderScreen = () => {
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Новая мойка"}
        />
        <Content>
          <Form>
            {fields.map(item => this.renderItemInput)}
          </Form>
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state)(NewCarWash);
