import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Toast } from "native-base";

import {CorporationForm} from '../../../components/Forms';
import { HeaderLayout } from "../../../components/Layout";
import { asyncRequestAuth } from "../../../utils";

import appActions from "../../../redux/app/actions";
import authActions from "../../../redux/auth/actions";



class UpdateBusiness extends Component {

  updateBusiness = async data => {
    console.log(data);
    const url = `corporation`;
    const { $updateBusiness, $globalSpinnerOn, $globalSpinnerOff, navigation } = this.props;
    try {
      $globalSpinnerOn();
      const newBusiness = await asyncRequestAuth(url, "PUT", "account", data);
      await $updateBusiness(newBusiness);
      await Toast.show({ text: "Успешно обвновлена компания" });
      await navigation.goBack();
    } catch (e) {
      const error = e;
      await Toast.show({ text: e.message || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
  };

  render() {
    const { navigation } = this.props;
    const business = navigation.getParam("business");
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Информация"}
        />
        <Content>
          <CorporationForm business={business} onSubmit={this.updateBusiness}/>
        </Content>
      </Container>
    );
  }

}


export default connect(state => state, { ...appActions, ...authActions })(UpdateBusiness);
