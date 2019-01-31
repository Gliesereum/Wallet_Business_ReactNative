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
  Toast,
  Picker
} from "native-base";

const deviceWidth = Dimensions.get("window").width;


import { asyncRequestTest } from "../../utils";

import { HeaderLayout } from "../../components/Layout";

import authActions from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import { Dimensions } from "react-native";

const fields = [
  { label: "Имя", key: "firstName", render: true },
  { label: "Фамилия", key: "lastName", render: true },
  { label: "Отчество", key: "middleName", render: true },
  { label: "Должность", key: "position", render: true },
  { label: "Страна Проживания", key: "country", render: true },
  { label: "Город Проживания", key: "city", render: true },
  { label: "Адресс, 8 символов", key: "address", render: true },
  { label: "Дополнительный Адресс, 8 символов", key: "addAddress", render: true },
  { label: "Аватар (URL)", key: "avatarUrl", render: false, defaultValue: "http" },
  { label: "Обложка (URL)", key: "coverUrl", render: false, defaultValue: "http" },
  {
    label: "Пол", key: "gender", type: "select", options: [
      { label: "Не указан", key: "UNKNOWN" },
      { label: "Мужской", key: "MALE" },
      { label: "Женский", key: "FEMALE" }
    ]
  }
];


class Main extends Component {

  state = {
    data: { avatarUrl: "http", coverUrl: "http" }
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
    const { $updateUser, $globalSpinnerOn, $globalSpinnerOff, navigation } = this.props;
    await $globalSpinnerOn();
    try {
      const url = `user`;
      const { data } = this.state;
      const { token } = this.props.auth;
      const newUser = await asyncRequestTest(url, "PUT", "account", token, data);
      await $updateUser(newUser);
      Toast.show({ text: "Успешно обновлён профиль" });
      navigation.goBack();
    } catch (e) {
      Toast.show({ text: e.message || "Ошибка" });
    } finally {
      await $globalSpinnerOff();
    }
  };

  renderItemInput = (item) => {
    const { onInput } = this;
    const value = this.state.data[item.key];
    const genders = [
      { label: "Не указан", key: "UNKNOWN" },
      { label: "Мужской", key: "MALE" },
      { label: "Женский", key: "FEMALE" }
    ];
    if (item.type === "select") {
      return (

        <Item key={item.key}>
          <Label style={{ paddingTop: 4 }}>{item.label}</Label>
          <Picker
            iosIcon={<Icon name="ios-arrow-down"/>}
            style={{ width: "100%", marginTop: 3 }}
            key={item.key}
            mode="dropdown"
            iosHeader={item.label}
            selectedValue={value}
            value={value}
            onValueChange={value => this.onInput("gender", value)}
          >
            {genders.map(item => (
              <Picker.Item
                label={item.label}
                key={item.key}
                value={item.key}
              />
            ))}
          </Picker>
        </Item>
      );
    }
    return item.render && (
      <Item fixedLabel key={item.key}>
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
          <Button block style={{ margin: 15, marginTop: 16 }} onPress={this.updateProfile}>
            <Text>Сохранить</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(state => state, ({ ...authActions, ...appActions }))(Main);
