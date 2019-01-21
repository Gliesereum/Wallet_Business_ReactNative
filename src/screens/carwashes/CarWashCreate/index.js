import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Text, Toast, View } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { CarWashForm } from "../../../components";
import { asyncRequestTest } from "../../../utils";

import appActions from "../../../redux/app/actions";
import washActions from "../../../redux/washes/actions";
import { Dimensions } from "react-native";


const deviceHeight = Dimensions.get("window").height;


class Index extends Component {

  onSubmit = async (data) => {
    const url = "carwash";
    const { $addWash, navigation } = this.props;
    const { token } = this.props.auth;
    try {
      this.props.$globalSpinnerOn();
      const newWash = await asyncRequestTest(url, "POST", "karma", token, data);
      await $addWash(newWash);
      await Toast.show({ text: "Успешно создана мойка!" });
      await navigation.navigate('ScheduleCarWash', {carWashData: newWash, isNew: true});
    } catch (e) {
      Toast.show({ text: e.message || "Ошибка" });
      throw e;
    } finally {
      this.props.$globalSpinnerOff();
    }
  };

  renderNotAllowedCreateCarWash = () => {
    return (
      <View style={{ paddingTop: deviceHeight / 2.5 }}>
        <Text style={{ textAlign: "center" }}>
          Аккаунт не верифицирован. Добавьте личную информацию, компанию и электронную почту.
        </Text>
      </View>
    );
  };

  renderForm = () => {
    const {corporation} = this.props.auth.user;
    return (
      <CarWashForm
        onSubmit={this.onSubmit}
        type={"new"}
        corporation={corporation}
      />
    );
  };

  renderScreen = () => {
    const userVerified = this.props.auth.user.corporation.length;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Новая мойка!"}
        />
        <Content>
          {userVerified ? this.renderForm() : this.renderNotAllowedCreateCarWash()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...washActions }))(Index);
