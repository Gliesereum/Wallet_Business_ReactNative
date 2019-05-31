import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Icon, Content, Toast } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { PackageForm } from "../../../components";

import { asyncRequestAuth } from "../../../utils";

import businessActions from "../../../redux/washes/actions";
import appActions from "../../../redux/app/actions";


class CarWashUpdatePackage extends Component {

  _onSubmit = async data => {
    const url = "package";
    try {
      await this.props.$globalSpinnerOn();
      const updatedPackage = await asyncRequestAuth(url, "PUT", "karma", data);
      this.props.$updatePackageService(updatedPackage);
      await Toast.show({ text: "Успешно обвновлён пакет услуг" });
      this.props.navigation.goBack();
    } catch (e) {
      const error = e;
      await Toast.show({ text: "Заполните все поля" });
    } finally {
      await this.props.$globalSpinnerOff();
    }
  };

  renderScreen = () => {
    const { navigation } = this.props;
    const business = this.props.navigation.getParam("carWash");
    const packageServices = this.props.navigation.getParam("packageServices");
    const servicePrices = this.props.washes.servicePrices[business.id];
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Обновить услугу"}
        />
        <Content>
          <PackageForm
            services={servicePrices}
            onSubmit={this._onSubmit}
            businessId={business.id}
            packageService={packageServices}
          />
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...businessActions, ...appActions }))(CarWashUpdatePackage);
