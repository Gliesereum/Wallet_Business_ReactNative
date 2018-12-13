import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Content,
  Icon,
  Button,
  Form,
  Input,
  Item,
  Label,
  Toast
} from "native-base";
import { asyncRequest, asyncRequestTest } from "../../utils";

import { HeaderLayout } from "../../components/Layout";

import authActions from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";

const fields = [
  { label: "Имя", key: "firstName" },
  { label: "Фамилия", key: "lastName" },
  { label: "Отчество", key: "middleName" },
  { label: "Должность", key: "position" },
  { label: "Страна Проживания", key: "country" },
  { label: "Город Проживания", key: "city" },
  { label: "Адресс, 8 символов", key: "address" },
  { label: "Дополнительный Адресс", key: "addAddress" },
  { label: "Аватар (URL)", key: "avatarUrl" },
  { label: "Обложка (URL)", key: "coverUrl" },
  { label: "Пол", key: "gender", options: [] }
];


class Main extends Component {

  state = {
    data: {}
  };

  componentWillMount() {
    this.initForm();
  }

  initForm = () => {
    const { user } = this.props.auth;
    this.setState(state => ({ ...state, data: user }));
  };

  onInput = (key, value) => {
    this.setState(state => ({ ...state, data: { ...state.data, [key]: value } }));
  };

  updateProfile = async () => {
    const url = `user`;
    const { data } = this.state;
    const { $updateUser, $globalSpinnerOn, $globalSpinnerOff, navigation } = this.props;
    try {
      $globalSpinnerOn();
      const newUser = await asyncRequestTest(url, "PUT", data);
      await $updateUser(newUser);
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
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Основна Информация"}
        />
        <Content>
          <Form>
            {fields.map(this.renderItemInput)}
          </Form>
          <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.updateProfile}>
            <Text>Сохранить</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(state => state, ({ ...authActions, ...appActions }))(Main);
