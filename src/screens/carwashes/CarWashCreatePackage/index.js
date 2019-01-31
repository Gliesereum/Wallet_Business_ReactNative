import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Icon, Content, Toast } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { PackageForm } from "../../../components";

import businessActions from "../../../redux/washes/actions";
import appActions from "../../../redux/app/actions";
import { asyncRequestAuth } from "../../../utils";


class CarWashCreatePackage extends Component {

  _onSubmit = async data => {
    const url = "package";
    try {
      await this.props.$globalSpinnerOn();
      const newPackage = await asyncRequestAuth(url, "POST", "karma", data);
      this.props.$addPackageService(newPackage);
      await Toast.show({ text: "Успешно создан пакет услуг" });
      this.props.navigation.goBack();
    } catch (e) {
      const error = e;
      console.log(error);
      await Toast.show({ text: "Заполните все поля" });
    } finally {
      await this.props.$globalSpinnerOff();
    }
  };

  renderScreen = () => {
    const { navigation } = this.props;
    const business = this.props.navigation.getParam("carWashData");
    const servicePrices = this.props.washes.servicePrices[business.id];
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Создать пакет услуг"}
        />
        <Content>
          <PackageForm
            services={servicePrices}
            onSubmit={this._onSubmit}
            businessId={business.id}
          />
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...businessActions }))(CarWashCreatePackage);
