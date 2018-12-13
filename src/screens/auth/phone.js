import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { CheckBox, Button, Text, View, Toast } from "native-base";

import PhoneInput from "react-native-phone-input";

import appActions from "../../redux/app/actions";
import authActions from "../../redux/auth/actions";

import { asyncRequest, asyncRequestTest } from "../../utils";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  phoneInputContainer: {
    width: width,
    padding: 25
  },
  checkboxContainer: {
    width: width,
    padding: 25
  },
  submitContainer: {
    width: width,
    padding: 25
  }
});


class Phone extends Component {

  state = { phone: "+380", isNew: false, code: "" };

  inputHandler = (key, value) => {
    this.setState(state => ({
      ...state,
      [key]: value
    }));
  };

  validPhone = () => {
    const phoneRe = new RegExp("^\\+?\\d{12}$");
    return phoneRe.test(this.state.phone);
  };

  getCodeConfig = () => {
    const { phone, isNew } = this.state;
    const phoneNumber = phone.replace("+", "");
    const url = `phone/code?phone=${phoneNumber}&isNew=${isNew}`;
    return { url };
  };

  sendCodeConfig = (code) => {
    const { isNew, phone } = this.state;
    const authType = isNew ? "signup" : "signin";
    const phoneNumber = phone.replace("+", "");
    const url = `auth/${authType}`;
    const body = { "code": code, type: "PHONE", value: phoneNumber, userType: "BUSINESS" };
    return { url, body };
  };

  getCodeHandler = async () => {
    const { url } = this.getCodeConfig();
    await this.props.$globalSpinnerOn();
    try {
      await asyncRequestTest(url, "GET");
      this.props.navigation.navigate("Code", {
        code: this.state.code,
        onSubmit: this.sendCodeHandler
      });
    } catch (e) {
      Toast.show({
        text: e.message || "Ошибка"
      });
    } finally {
      await this.props.$globalSpinnerOff();
    }

  };

  sendCodeHandler = async code => {
    await this.props.$globalSpinnerOn();
    try {
      const { url, body } = this.sendCodeConfig(code);
      const request = await asyncRequest(url, "POST", body);
      await this.props.$loginUser(request.tokenInfo);
      this.props.navigation.navigate("Loading");
      Toast.show({ text: "Welcome, Developer!" });
    } catch (e) {
      Toast.show({ text: e.message || "Ошибка" });
    } finally {
      await this.props.$globalSpinnerOff();
    }

  };

  _renderScreen = () => {
    const { validPhone, getCodeHandler } = this;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.phoneInputContainer}>
            <PhoneInput
              initialCountry={"ua"}
              value={this.state.phone}
              ref={(ref) => {
                this.phone = ref;
              }}
              onChangePhoneNumber={number => this.inputHandler("phone", number)}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={this.state.isNew}
              onPress={e => this.inputHandler("isNew", !this.state.isNew)}
            />
            <Text>Новое Юр. Лицо</Text>
          </View>
          <View style={styles.submitContainer}>
            <Button
              disabled={!validPhone()}
              onPress={getCodeHandler}
            >
              <Text>Получить код</Text>
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return this._renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...authActions }))(Phone);
