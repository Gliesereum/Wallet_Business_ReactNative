import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Toast } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { asyncRequestAuth } from "../../../utils";
import appActions from "../../../redux/app/actions";
import authActions from "../../../redux/auth/actions";

import {CorporationForm} from '../../../components/Forms';

class NewBusiness extends Component {

  createBusiness = async data => {
    const url = `corporation`;
    const { $addBusiness, $globalSpinnerOn, $globalSpinnerOff, navigation } = this.props;
    try {
      $globalSpinnerOn();
      const newCorporation = await asyncRequestAuth(url, "POST", "account", data);
      await $addBusiness(newCorporation);
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
          <CorporationForm isNew onSubmit={this.createBusiness}/>
        </Content>
      </Container>
    );
  }

}


export default connect(state => state, { ...appActions, ...authActions })(NewBusiness);

