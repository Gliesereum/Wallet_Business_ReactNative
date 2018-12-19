import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Text, Toast, View } from "native-base";

import { HeaderLayout } from "../../components/Layout";
import { CarWashForm } from "../../components";
import { asyncRequestTest } from "../../utils";

import appActions from "../../redux/app/actions";
import washActions from "../../redux/washes/actions";
import { Dimensions } from "react-native";


const deviceHeight = Dimensions.get("window").height;


class NewCarWash extends Component {

  onSubmit = async (data) => {
    const url = "carwash";
    const { $addWash } = this.props;
    const { token } = this.props.auth;
    try {
      this.props.$globalSpinnerOn();
      const newWash = await asyncRequestTest(url, "POST", "karma", token, data);
      await $addWash(newWash);
      await this.props.navigation.goBack();
      Toast.show({ text: "Успешно создана мойка!" });
    } catch (e) {
      Toast.show({ text: e.message || "Ошибка" });
    } finally {
      this.props.$globalSpinnerOff();
    }
  };

  renderNotAllowedCreateCarWash = () => {
    return (
      <View style={{ paddingTop: deviceHeight / 2.5 }}>
        <Text style={{ textAlign: "center" }}>
          Аккаунт не верифицирован. Добавьте личную информацию и электронную почту.
        </Text>
      </View>
    );
  };

  renderForm = () => {
    return <CarWashForm onSubmit={this.onSubmit} type={"new"}/>;
  };

  renderScreen = () => {
    const { verifiedStatus } = this.props.auth.user;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Новая мойка"}
        />
        <Content>
          {verifiedStatus === "VERIFIED" ? this.renderForm() : this.renderNotAllowedCreateCarWash()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...washActions }))(NewCarWash);
