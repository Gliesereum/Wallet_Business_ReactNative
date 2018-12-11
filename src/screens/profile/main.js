import React, { Component } from "react";
import {
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
  Form,
  Input,
  Item,
  Label
} from "native-base";


const fields = [
  { label: "Имя", key: "firstname" },
  { label: "Фамилия", key: "lastname" },
  { label: "Отчество", key: "middlename" },
  { label: "Должность", key: "position" },
  { label: "Страна Проживания", key: "country" },
  { label: "Город Проживания", key: "city" },
  { label: "Адресс", key: "address" },
  { label: "Пол", key: "gender" }
];


class Main extends Component {

  renderItemInput = (item) => {
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
          <Title>Основная Информация</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Form>
            {fields.map(this.renderItemInput)}
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
