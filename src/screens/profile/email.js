import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, Container, Content, Icon, Button, Toast, View, Form, Input, Label, Item } from "native-base";
import { asyncRequest, asyncRequestTest } from "../../utils";

import { HeaderLayout } from "../../components/Layout";

import appActions from "../../redux/app/actions";
import authActions from "../../redux/auth/actions";

class Email extends Component {

  state = { gotCode: false, email: "", code: "" };

  getCode = async () => {
    const { $globalSpinnerOn, $globalSpinnerOff } = this.props;
    const {email} = this.state;
    const url = `email/code?email=${email}&isNew=true`;
    try {
      $globalSpinnerOn();
      const request = await asyncRequestTest(url);
      this.setState(state => ({ ...state, gotCode: true }));
      Toast.show({text: "Введите код отправленный на указаную почту"});
    } catch (e) {
      Toast.show({ text: e || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
  };

  sendCode = async () => {
    const { $addEmail, navigate } = this.props;
    const {code, email} = this.state;
    const url = `email`;
    const body = {code, email};
    const { $globalSpinnerOn, $globalSpinnerOff } = this.props;
    try {
      $globalSpinnerOn();
      const newEmail = await asyncRequest(url, 'POST', body);
      await $addEmail(newEmail);
      Toast.show({text: "Успешно добавлена почта"});
      navigate.goBack();
    } catch (e) {
      Toast.show({ text: e || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
  };

  onInput = (key, value) => {
    this.setState(state => ({ ...state, [key]: value }));
  };

  renderEmailsList = () => {
    return (
      <View><Text>Список Почт</Text></View>
    );
  };

  emailValid = () => {
    const emailRe = new RegExp("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
    return emailRe.test(this.state.email);
  };

  renderCodeForm = () => {
    const { onInput, sendCode } = this;
    const { code } = this.state;
    return (
      <Form>
        <Item floatingLabel>
          <Label style={{ paddingTop: 4 }}>Код</Label>
          <Input
            value={code}
            onChangeText={text => onInput("code", text)}
            keyboardType={"numeric"}
            autoFocus={true}
          />
        </Item>
        <Button
          style={{ margin: 15, marginTop: 50 }}
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
        <Item floatingLabel>
          <Label style={{ paddingTop: 4 }}>Почта</Label>
          <Input
            value={email}
            onChangeText={text => onInput("email", text)}
            keyboardType={"email-address"}
          />
        </Item>
        {gotCode ? (
          this.renderCodeForm()
        ) : (
          <Button
            style={{ margin: 15, marginTop: 50 }}
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
    const { emails } = this.props.auth;
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
        <Content>
          {emails.length ? this.renderEmailsList() : this.renderEmailForm()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}

export default connect(state => state, ({ ...appActions, ...authActions }))(Email);
