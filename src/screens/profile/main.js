import React, {Component} from "react";
import {connect} from "react-redux";

import * as Yup from "yup";

import {Formik} from 'formik';

import {StyleSheet, KeyboardAvoidingView, ScrollView, View, TextInput} from 'react-native';
import {Text, Container, Content, Icon, Button, Form, Toast} from "native-base";

import {asyncRequestTest} from "../../utils";
import {HeaderLayout} from "../../components/Layout";
import authActions from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";

import {Field} from '../../components';

const styles = StyleSheet.create({
  container: {
    padding: 12,
  }
});

const fields = [
  {label: "Имя", key: "firstName", render: true, defaultValue: 'Не заполнено'},
  {label: "Фамилия", key: "lastName", render: true, defaultValue: 'Не заполнено'},
  {label: "Отчество", key: "middleName", render: true, defaultValue: 'Не заполнено'},
  {
    label: "Пол", key: "gender", type: "select", render: true, options: [
      {label: "Не указан", key: "UNKNOWN"},
      {label: "Мужской", key: "MALE"},
      {label: "Женский", key: "FEMALE"}
    ], defaultValue: 'UNKNOWN'
  },
  {label: "Страна Проживания", key: "country", render: true, defaultValue: 'Не заполнено'},
  {label: "Город Проживания", key: "city", render: true, defaultValue: 'Не заполнено'},
  {label: "Адресс, 8 символов", key: "address", render: true, defaultValue: 'Не заполнено'},
  {label: "Дополнительный Адресс, 8 символов", key: "addAddress", render: false, defaultValue: 'Не заполнено'},
  {label: "Аватар (URL)", key: "avatarUrl", render: false, defaultValue: null},
  {label: "Обложка (URL)", key: "coverUrl", render: false, defaultValue: null},
];


const requiredMessage = 'Обязательно к заполнению';

const UserSchema = Yup.object().shape({
  firstName: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  lastName: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  middleName: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  country: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  city: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
  address: Yup.string().required(requiredMessage).min(2, 'Минимум 2 символа').typeError(requiredMessage),
});


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
    // return fields.reduce((acc, field) => {
    //   if (!obj[field.key] || !obj[field.key].length) {
    //     obj[field.key] = field.defaultValue;
    //     return acc;
    //   }
    //   return acc;
    // }, obj);
    return obj;
  };

  onInput = (key, value) => {
    this.setState(state => ({...state, data: {...state.data, [key]: value}}));
  };

  updateProfile = async data => {
    const {$updateUser, $globalSpinnerOn, $globalSpinnerOff, navigation} = this.props;
    await $globalSpinnerOn();
    try {
      const url = `user`;
      const {token} = this.props.auth;
      const newUser = await asyncRequestTest(url, "PUT", "account", token, this.fillUserData(data));
      await $updateUser(newUser);
      Toast.show({text: "Успешно обновлён профиль"});
      navigation.goBack();
    } catch (e) {
      const error = e;
      debugger;
      Toast.show({text: 'Заполните все поля!'});
    } finally {
      await $globalSpinnerOff();
    }
  };

  renderItemInput = ({key, value, error, touched, render, label, type, onChange, onBlur, options}) => {
    return render && (
      <Field
        key={key}
        type={type}
        value={value}
        error={error}
        touched={touched}
        label={label}
        fieldKey={key}
        onChange={onChange(key)}
        onBlur={onBlur(key)}
        options={options}
      />
    );
  };

  render() {
    const {user} = this.props.auth;
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
              <Formik initialValues={user} onSubmit={this.updateProfile} validationSchema={UserSchema}>
                {props => {
                  return (
                    <View>
                      {fields.map(field => this.renderItemInput({
                        ...field,
                        value: props.values[field.key],
                        error: props.errors[field.key],
                        onChange: props.handleChange,
                        onBlur: props.handleBlur,
                        touched: props.touched[field.key]
                      }))}
                      <Button block onPress={props.handleSubmit} title={'Сохранить'}>
                        <Text>Сохранить</Text>
                      </Button>
                    </View>
                  );
                }
                }
              </Formik>
            </ScrollView>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

}

export default connect(state => state, ({...authActions, ...appActions}))(Main);
