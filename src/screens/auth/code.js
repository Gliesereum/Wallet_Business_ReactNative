import React from "react";
import { TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import { Text, Button, Input, Form, Item, Content } from "native-base";

import { Timer } from "../../components";

const deviceHeight = Dimensions.get("window").height;

const styles = {
  container: {
    flex: 1,
    paddingTop: deviceHeight / 3.5
  },
  submitButton: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
  }
};


class Code extends React.Component {

  state = { value: "" };

  inputHandler = (text) => {
    this.setState(state => ({
      value: text
    }));
  };

  submitHandler = () => {
    const onSubmit = this.props.navigation.getParam("onSubmit");
    Keyboard.dismiss();
    onSubmit(this.state.value);
  };

  renderScreen = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Content style={styles.container}>
          <Form>
            <Item>
              <Input
                keyboardType="numeric"
                value={this.state.value}
                onChangeText={this.inputHandler}
              />
            </Item>
          </Form>
          <Text style={{ textAlign: "center" }}>
            <Timer time={180000} onTimeOver={e => {
              this.props.navigation.goBack();
            }}/>
          </Text>
          <Button
            style={styles.submitButton}
            disabled={(this.state.value.length !== 6)}
            onPress={this.submitHandler}
            buttonStyle={{ width: "100%" }}
            block
            full
          >
            <Text>Войти</Text>
          </Button>
        </Content>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default Code;
