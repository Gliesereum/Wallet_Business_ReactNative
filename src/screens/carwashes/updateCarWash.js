import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Toast } from "native-base";

import { HeaderLayout } from "../../components/Layout";
import { CarWashForm } from "../../components";
import { asyncRequestTest } from "../../utils";

import appActions from "../../redux/app/actions";
import washActions from "../../redux/washes/actions";
import { Dimensions } from "react-native";


const deviceHeight = Dimensions.get("window").height;


class UpdateCarWash extends Component {

  onSubmit = async (data) => {
    const url = "carwash";
    const { $updateWash } = this.props;
    const { token } = this.props.auth;
    try {
      this.props.$globalSpinnerOn();
      const newWash = await asyncRequestTest(url, "PUT", "karma", token, data);
      await $updateWash(newWash);
      await this.props.navigation.navigate('CarWashes');
      Toast.show({ text: "Успешно обвновлено!" });
    } catch (e) {
      Toast.show({ text: e.message || "Ошибка" });
    } finally {
      this.props.$globalSpinnerOff();
    }
  };

  renderScreen = () => {
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Обновить"}
        />
        <Content>
          <CarWashForm onSubmit={this.onSubmit} type={"update"}/>
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...washActions }))(UpdateCarWash);
