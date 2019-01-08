import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Toast } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import BusinessForm from "../../../components/BusinessForm";
import { asyncRequestAuth } from "../../../utils";
import appActions from "../../../redux/app/actions";
import authActions from "../../../redux/auth/actions";


class NewBusiness extends Component {

  createBusiness = async data => {
    const url = `business`;
    const { $addBusiness, $globalSpinnerOn, $globalSpinnerOff, navigation } = this.props;
    try {
      $globalSpinnerOn();
      const newBusiness = await asyncRequestAuth(url, "POST", "account", data);
      await $addBusiness(newBusiness);
      await Toast.show({ text: "Успешно добавлена компания" });
      await navigation.goBack();
    } catch (e) {
      await Toast.show({ text: e.message || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Новая Компания"}
        />
        <Content>
          <BusinessForm isNew onSubmit={this.createBusiness}/>
        </Content>
      </Container>
    );
  }

}


export default connect(state => state, { ...appActions, ...authActions })(NewBusiness);

