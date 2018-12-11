import React from "react";
import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Text, Button, Input, Form, Item, Content } from "native-base";

import { Timer } from "../../components";


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
    const { navigation } = this.props;
    const code = navigation.getParam("code");
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Content>
          <Form>
            <Item>
              <Input
                keyboardType="numeric"
                value={code}
                onChangeText={this.inputHandler}
              />
            </Item>
          </Form>
          <Text style={{ textAlign: "center" }}>
            <Timer time={180000} onTimeOver={e => {
              console.log("Done");
            }}/>
          </Text>
          <Button
            disabled={(this.state.value.length !== 6)}
            onPress={this.submitHandler}
            buttonStyle={{ width: "100%" }}
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
