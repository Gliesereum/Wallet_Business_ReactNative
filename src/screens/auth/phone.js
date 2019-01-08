import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Text, View, Toast } from "native-base";

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
    width: "100%",
    padding: 15
  },
  submitContainer: {
    width: "100%",
    padding: 15
  }
});


class Phone extends Component {

  state = { phone: "+380", code: "" };

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
    const { phone } = this.state;
    const phoneNumber = phone.replace("+", "");
    const url = `phone/code?phone=${phoneNumber}`;
    return { url };
  };

  sendCodeConfig = (code) => {
    const { phone } = this.state;
    const phoneNumber = phone.replace("+", "");
    const url = `auth/signin`;
    const body = { "code": code, type: "PHONE", value: phoneNumber, userType: "BUSINESS" };
    return { url, body };
  };

  getCodeHandler = async () => {
    const { url } = this.getCodeConfig();
    await this.props.$globalSpinnerOn();
    try {
      await asyncRequestTest(url, "GET", "account");
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
      const request = await asyncRequestTest(url, "POST", "account", null, body);
      await this.props.$loginUser(request.tokenInfo);
      this.props.navigation.navigate("Loading");
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

          <View style={styles.submitContainer}>
            <Button
              disabled={!validPhone()}
              onPress={getCodeHandler}
              block
              full
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
