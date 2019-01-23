import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Icon, Content } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { PackageForm } from "../../../components";

import { asyncRequestAuth } from "../../../utils";


class CarWashUpdatePackage extends Component {

  _onSubmit = async data => {
    const url = "package";
    console.log("data", data);
    try {
      await asyncRequestAuth(url, "PUT", "karma", data);
      this.props.navigation.goBack();
    } catch (e) {
      const error = e;
      debugger;
    }
  };

  renderScreen = () => {
    const { navigation } = this.props;
    const carWash = this.props.navigation.getParam("carWash");
    const packageServices = this.props.navigation.getParam("packageServices");
    const servicePrices = this.props.washes.servicePrices[carWash.id];
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
            corporationServiceId={carWash.id}
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


export default connect(state => state)(CarWashUpdatePackage);
