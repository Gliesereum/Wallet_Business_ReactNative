import React, {Component} from "react";
import {connect} from "react-redux";
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

import {asyncRequestTest} from "../../utils";
import {HeaderLayout} from "../../components/Layout";
import authActions from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";

const fields = [
  {label: "Имя", key: "firstName", render: true, defaultValue: 'Не заполнено'},
  {label: "Фамилия", key: "lastName", render: true, defaultValue: 'Не заполнено'},
  {label: "Отчество", key: "middleName", render: true, defaultValue: 'Не заполнено'},
  {label: "Должность", key: "position", render: true, defaultValue: 'Не заполнено'},
  {label: "Страна Проживания", key: "country", render: true, defaultValue: 'Не заполнено'},
  {label: "Город Проживания", key: "city", render: true, defaultValue: 'Не заполнено'},
  {label: "Адресс, 8 символов", key: "address", render: true, defaultValue: 'Не заполнено'},
  {label: "Дополнительный Адресс, 8 символов", key: "addAddress", render: false, defaultValue: 'Не заполнено'},
  {label: "Аватар (URL)", key: "avatarUrl", render: false, defaultValue: null},
  {label: "Обложка (URL)", key: "coverUrl", render: false, defaultValue: null},
  {
    label: "Пол", key: "gender", type: "select", options: [
      {label: "Не указан", key: "UNKNOWN"},
      {label: "Мужской", key: "MALE"},
      {label: "Женский", key: "FEMALE"}
    ], defaultValue: 'UNKNOWN'
  }
];


class Main extends Component {

  state = {
    data: {}
  };

  componentWillMount() {
    this.initForm();
  }

  initForm = () => {
    const {user} = this.props.auth;
    this.setState(state => ({...state, data: user}));
  };

  fillUserData = obj => {
    return fields.reduce((acc, field) => {
      if (!obj[field.key] || !obj[field.key].length) {
        obj[field.key] = field.defaultValue;
        return obj
      }
      return obj
    }, obj)
  };

  onInput = (key, value) => {
    this.setState(state => ({...state, data: {...state.data, [key]: value}}));
  };

  updateProfile = async () => {
    const {$updateUser, $globalSpinnerOn, $globalSpinnerOff, navigation} = this.props;
    await $globalSpinnerOn();
    try {
      const url = `user`;
      const {data} = this.state;
      const {token} = this.props.auth;
      const newUser = await asyncRequestTest(url, "PUT", "account", token, this.fillUserData(data));
      await $updateUser(newUser);
      Toast.show({text: "Успешно обновлён профиль"});
      navigation.goBack();
    } catch (e) {
      Toast.show({text: 'Заполните все поля!'});
    } finally {
      await $globalSpinnerOff();
    }
  };

  renderItemInput = (item) => {
    const {onInput} = this;
    const value = this.state.data[item.key];
    const genders = [
      {label: "Не указан", key: "UNKNOWN"},
      {label: "Мужской", key: "MALE"},
      {label: "Женский", key: "FEMALE"}
    ];
    if (item.type === "select") {
      return (

        <Item key={item.key}>
          <Label style={{paddingTop: 4}}>{item.label}</Label>
          <Picker
            iosIcon={<Icon name="ios-arrow-down"/>}
            style={{width: "100%", marginTop: 3}}
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
        <Label style={{paddingTop: 4}}>{item.label}</Label>
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
          <Button block style={{margin: 15, marginTop: 16}} onPress={this.updateProfile}>
            <Text>Сохранить</Text>
          </Button>
        </Content>
      </Container>
    );
  }

}

export default connect(state => state, ({...authActions, ...appActions}))(Main);
