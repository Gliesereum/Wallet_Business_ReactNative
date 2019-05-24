import React, {Component} from "react";
import {connect} from "react-redux";

import {StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {
  Text,
  Container,
  Content,
  Icon,
  Button,
  Form,
  Toast,
} from "native-base";

import {asyncRequestTest} from "../../utils";
import {HeaderLayout} from "../../components/Layout";
import authActions from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";

import {Field} from '../../components';

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
  }
});

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
    label: "Пол", key: "gender", type: "select", render: true, options: [
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
        return acc;
      }
      return acc;
    }, obj);
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
    return item.render && (
      <Field
        key={item.key}
        type={item.type}
        value={value}
        label={item.label}
        fieldKey={item.key}
        onChange={text => onInput(item.key, text)}
        options={item.options}
      />
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
        <Content style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView>
              <Form>
                {fields.map(this.renderItemInput)}
              </Form>
              <Button block onPress={this.updateProfile}>
                <Text>Сохранить</Text>
              </Button>
            </ScrollView>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

}

export default connect(state => state, ({...authActions, ...appActions}))(Main);
