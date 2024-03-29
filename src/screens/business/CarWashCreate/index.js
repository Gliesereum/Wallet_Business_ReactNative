import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Text, Toast, View } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { CarWashForm, EmptyScreen } from "../../../components";
import { asyncRequestTest } from "../../../utils";

import appActions from "../../../redux/app/actions";
import washActions from "../../../redux/washes/actions";
import { Dimensions } from "react-native";


const deviceHeight = Dimensions.get("window").height;


class Index extends Component {

  onSubmit = async (data) => {
    const url = "business";
    const { $addWash, navigation } = this.props;
    const { token } = this.props.auth;
    try {
      this.props.$globalSpinnerOn();
      const newWash = await asyncRequestTest(url, "POST", "karma", token, data);
      await $addWash(newWash);
      await Toast.show({ text: "Успешно создан сервис" });
      await navigation.navigate('ScheduleCarWash', {carWashData: newWash, isNew: true});
    } catch (e) {
      const error = e;
      Toast.show({ text: "Заполните все поля" });
      throw e;
    } finally {
      this.props.$globalSpinnerOff();
    }
  };

  renderNotAllowedCreateCarWash = () => {
    return <EmptyScreen
      message={'Аккаунт не верифицирован. Добавьте личную информацию, компанию и электронную почту.'}
      iconName={"md-lock"}
      />
  };

  renderForm = () => {
    const {corporations} = this.props.auth;
    const {businessType, businessCategory} = this.props.washes;
    return (
      <CarWashForm
        onSubmit={this.onSubmit}
        type={"new"}
        corporation={corporations}
        businessType={businessType}
        businessCategory={businessCategory}
      />
    );
  };

  renderScreen = () => {
    const userVerified = this.props.auth.corporations.length;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Новый бизнес"}
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
