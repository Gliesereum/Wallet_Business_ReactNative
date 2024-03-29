import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Keyboard,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  View
} from "react-native";
import {Toast} from "native-base";
import {TextInput, Button} from "react-native-paper";


import {DismissKeyboard} from '../../components';
import appActions from "../../redux/app/actions";
import authActions from "../../redux/auth/actions";

import styles from './styles';

import {asyncRequestTest} from "../../utils";


const logoURL = require("../../../assets/images/coupler-logo.png");
const deviceHeight = Dimensions.get("screen").height;


class Phone extends Component {

  state = {phone: "+380"};

  phoneInput = value => {
    const re = new RegExp(/^[+\\d](?:.*\\d)?$/);
    if (!re.test(value)) {
      this.setState({phone: value});
    }

  };

  validPhone = () => {
    const phoneRe = new RegExp("^\\+?\\d{12}$");
    return phoneRe.test(this.state.phone);
  };

  getCodeConfig = () => {
    const {phone} = this.state;
    const phoneNumber = phone.replace("+", "");
    const url = `phone/code?phone=${phoneNumber}`;
    return {url};
  };

  sendCodeConfig = (code) => {
    const {phone} = this.state;
    const phoneNumber = phone.replace("+", "");
    const url = `auth/signin`;
    const body = {"code": code, type: "PHONE", value: phoneNumber};
    return {url, body};
  };

  getCodeHandler = async () => {
    const {url} = this.getCodeConfig();
    await this.props.$globalSpinnerOn();
    try {
      Keyboard.dismiss();
      await asyncRequestTest(url, "GET", "account");
      this.props.navigation.navigate("Code", {
        phone: this.state.phone,
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
      const {url, body} = this.sendCodeConfig(code);
      const request = await asyncRequestTest(url, "POST", "account", null, body);
      await this.props.$loginUser(request.tokenInfo);
      this.props.navigation.navigate("Loading");
    } catch (e) {
      Toast.show({text: e.message || "Не верный код", position: "absolute"});
    } finally {
      Keyboard.dismiss();
      await this.props.$globalSpinnerOff();
    }
  };

  _renderScreen = () => {
    const {validPhone, getCodeHandler} = this;
    return (
      <KeyboardAvoidingView behavior="position" enabled={true} keyboardVerticalOffset={-100}>
        <DismissKeyboard>
          <View keyboardShouldPersistTaps={'always'}>
            <View style={styles.container}>
              <View style={styles.logo}>
                <Image source={logoURL} style={styles.image}/>
              </View>
              <View style={styles.input}>
                <TextInput
                  value={this.state.phone}
                  onChangeText={value => this.phoneInput(value)}
                  mode={"outlined"}
                  keyboardType={"phone-pad"}
                  label={"Номер телефона"}
                />
              </View>
              <View>
                <Button
                  disabled={!validPhone()}
                  onPress={getCodeHandler}
                  mode={"contained"}
                >
                  Получить код
                </Button>
              </View>
            </View>
          </View>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    );
  };

  render() {
    return this._renderScreen();
  }

}


export default connect(state => state, ({...appActions, ...authActions}))(Phone);
