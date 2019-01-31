import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Toast } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { CarWashForm } from "../../../components";
import { asyncRequestAuth } from "../../../utils";

import appActions from "../../../redux/app/actions";
import washActions from "../../../redux/washes/actions";


class Index extends Component {

  onSubmit = async (data) => {
    const url = "business";
    const { $updateWash } = this.props;
    try {
      this.props.$globalSpinnerOn();
      const newWash = await asyncRequestAuth(url, "PUT", "karma", data);
      await $updateWash(newWash);
      await this.props.navigation.navigate("CarWashes");
      Toast.show({ text: "Успешно обвновлено!" });
    } catch (e) {
      const error = e;
      Toast.show({ text: e.message || "Заполните все поля" });
    } finally {
      this.props.$globalSpinnerOff();
    }
  };

  onDelete = async () => {
    const data = this.props.navigation.getParam("carWashData");
    const url = `business/${data.id}`;
    try {
      await this.props.$globalSpinnerOn();
      await asyncRequestAuth(url, "DELETE");
      await this.props.$removeBusiness(data.id);
      await this.props.navigation.navigate('CarWashes');
      await Toast.show({ text: "Бизнес удалён" });
    } catch (e) {
      const error = e;
      Toast.show({ text: e.message || "Ошибка" });
    } finally {
      await this.props.$globalSpinnerOff();
    }
  };

  renderScreen = () => {
    const data = this.props.navigation.getParam("carWashData");
    const { corporation } = this.props.auth.user;
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
          <CarWashForm
            onSubmit={this.onSubmit}
            onDelete={this.onDelete}
            type={"update"}
            carWashData={data}
            corporation={corporation}
          />
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...washActions }))(Index);
