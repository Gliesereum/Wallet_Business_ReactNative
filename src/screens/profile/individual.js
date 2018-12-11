import React, { Component } from "react";
import {
  View,
  Text,
  Container,
  Content,
  Title,
  Header,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Item,
  Label, Input, Form
} from "native-base";

const fields = [
  { label: "Название", key: "name" },
  { label: "Описание", key: "description" },
  { label: "ЭДРПОУ", key: "edrpou" },
  { label: "Адрес", key: "address" }
];


class Main extends Component {

  renderItemField = item => {
    return (
      <Item floatingLabel key={item.key}>
        <Label>{item.label}</Label>
        <Input/>
      </Item>
    );
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
          <Title>Юридическая информация</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Form>
            {fields.map(this.renderItemField)}
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }}>
            <Text>Сохранить</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Main;
