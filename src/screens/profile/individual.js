import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Content,
  Icon,
  Button,
  Item,
  Label, Input, Form, Toast
} from "native-base";

import { HeaderLayout } from "../../components/Layout";
import { asyncRequest } from "../../utils";

import appActiions from '../../redux/app/actions';
import authActiions from '../../redux/auth/actions';

const fields = [
  { label: "Название", key: "name" },
  { label: "Описание", key: "description" },
  { label: "ЭДРПОУ, 8 символов", key: "edrpou" },
  { label: "Адрес", key: "address" }
];


class Invdividual extends Component {

  state = {
    data: {}
  };

  componentWillMount() {
    this.initForm();
  }

  initForm = () => {
    const { business } = this.props.auth;
    this.setState(state => ({ ...state, data: business }));
  };

  onInput = (key, value) => {
    this.setState(state => ({ ...state, data: { ...state.data, [key]: value } }));
  };

  updateBusiness = async () => {
    const url = `user/business`;
    const { data } = this.state;
    const { $updateBusiness, $globalSpinnerOn, $globalSpinnerOff, navigation } = this.props;
    try {
      $globalSpinnerOn();
      const newUser = await asyncRequest(url, "PUT", data);
      await $updateBusiness(newUser);
      await Toast.show({ text: "Успешно обновлён профиль" });
      await navigation.goBack();
    } catch (e) {
      await Toast.show({ text: e || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
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
    const { updateBusiness } = this;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Юридическая информация"}
        />
        <Content>
          <Form>
            {fields.map(this.renderItemInput)}
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={updateBusiness}>
            <Text>Сохранить</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(state => state,({...authActiions, ...appActiions}))(Invdividual);
