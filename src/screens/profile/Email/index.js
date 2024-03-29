import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  Container,
  Content,
  Icon,
  Button,
  Toast,
  View,
  Form,
  ListItem,
  Body
} from "native-base";

import { asyncRequestTest, asyncRequestAuth } from "../../../utils";

import {Field} from '../../../components';

import { HeaderLayout } from "../../../components/Layout";

import appActions from "../../../redux/app/actions";
import authActions from "../../../redux/auth/actions";

class Email extends Component {

  state = { gotCode: false, email: "", code: "" };

  getCode = async () => {
    const { $globalSpinnerOn, $globalSpinnerOff } = this.props;
    const { email } = this.state;
    const url = `email/code?email=${email}&isNew=true`;
    try {
      $globalSpinnerOn();
      const request = await asyncRequestTest(url, "GET", "account");
      this.setState(state => ({ ...state, gotCode: true }));
      Toast.show({ text: "Введите код отправленный на указаную почту" });
    } catch (e) {
      Toast.show({ text: e || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
  };

  emailValid = () => {
    const emailRe = new RegExp("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
    return emailRe.test(this.state.email);
  };

  sendCode = async () => {
    const { $addEmail, navigation } = this.props;
    const { code, email } = this.state;
    const url = `email`;
    const body = { code, email };
    const { $globalSpinnerOn, $globalSpinnerOff } = this.props;
    try {
      $globalSpinnerOn();
      const newEmail = await asyncRequestAuth(url, "POST", "account", body);
      await $addEmail(newEmail);
      await Toast.show({ text: "Успешно добавлена почта" });
      navigation.goBack();
    } catch (e) {
      await Toast.show({ text: e.message || "Ошибка" });
    } finally {
      await $globalSpinnerOff();
    }
  };

  onInput = (key, value) => {
    this.setState(state => ({ ...state, [key]: value }));
  };

  renderEmailsList = () => {
    const { email } = this.props.auth;
    return (
      <View>
        <ListItem><Body><Text>{email.email}</Text></Body></ListItem>
      </View>
    );
  };

  renderCodeForm = () => {
    const { onInput, sendCode } = this;
    const { code } = this.state;
    return (
      <Form>
        <Field
          type={'text'}
          value={code}
          onChange={text => onInput("code", text)}
          keyboardType={"numeric"}
          label={'Код'}
          fieldKey={'code'}
          autoFocus
        />
        <Button
          style={{ marginTop: 8 }}
          disabled={code.length !== 6}
          onPress={sendCode}
          block
        >
          <Text>Добавить</Text>
        </Button>
      </Form>
    );
  };

  renderEmailForm = () => {
    const { onInput, getCode, emailValid } = this;
    const { email, gotCode } = this.state;
    return (
      <Form>

        <Field
          type={'text'}
          value={email}
          onChange={text => onInput("email", text)}
          label={'Почта'}
          fieldKey={'email'}
          keyboardType={'email-address'}
          />
        {gotCode ? (
          this.renderCodeForm()
        ) : (
          <Button
            disabled={!emailValid()}
            onPress={getCode}
            block
          >
            <Text>Получить код</Text>
          </Button>
        )}

      </Form>
    );
  };

  renderScreen = () => {
    const { email } = this.props.auth;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={("Электронная почта")}
        />
        <Content style={{padding: 8}}>
          {email ? this.renderEmailsList() : this.renderEmailForm()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}

export default connect(state => state, ({ ...appActions, ...authActions }))(Email);
