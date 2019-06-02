import React from "react";
import {
  Keyboard,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  View
} from "react-native";
import {Text} from "native-base";

import {TextInput, Button} from "react-native-paper";

import {Timer, DismissKeyboard} from "../../components";

const deviceHeight = Dimensions.get("window").height;

const couplerLogo = require("../../../assets/images/coupler-logo.png");


const styles = {

  container: {
    width: "100%",
    height: deviceHeight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  logo: {
    width: "100%",
    height: 230,
    paddingBottom: 32
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  text: {
    paddingBottom: 12,
    textAlign: "center"
  },
  input: {
    paddingVertical: 24
  },
  cancelButton: {
    paddingVertical: 24
  }
};


class Code extends React.Component {

  state = {value: ""};

  inputHandler = async text => {
    await this.setState(state => ({value: text}));
    if (text.length === 6) {
      this.submitHandler();
    }
  };

  submitHandler = () => {
    const onSubmit = this.props.navigation.getParam("onSubmit");
    Keyboard.dismiss();
    onSubmit(this.state.value);
  };

  renderScreen = () => {
    const phone = this.props.navigation.getParam("phone");
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-75}>
        <DismissKeyboard>
          <View keyboardShouldPersistTaps={'always'}>
            <View style={styles.container}>
              <View style={styles.logo}>
                <Image source={couplerLogo} style={styles.image}/>
              </View>
              <View>
                <Text style={styles.text}>Код отправлен на номер</Text>
              </View>
              <View>
                <Text style={styles.text}>{phone}</Text>
              </View>
              <View style={styles.input}>
                <TextInput
                  label={"Код из СМС"}
                  mode={"outlined"}
                  keyboardType={"phone-pad"}
                  value={this.state.value}
                  onChangeText={this.inputHandler}
                />
              </View>
              <View>
                <Text style={styles.text}>
                  <Timer time={180000} onTimeOver={e => {
                    this.props.navigation.goBack();
                  }}/>
                </Text>
              </View>
              <View>
                <Button
                  disabled={(this.state.value.length !== 6)}
                  onPress={this.submitHandler}
                  mode={"contained"}
                >
                  Войти
                </Button>
              </View>
              <View style={styles.cancelButton}>
                <Button mode={"outlined"} style={styles} onPress={() => this.props.navigation.goBack()}>
                  Назад
                </Button>
              </View>
            </View>
          </View>
        </DismissKeyboard>
      </KeyboardAvoidingView>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default Code;
