import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Icon, Content } from "native-base";

import { HeaderLayout } from "../../../components/Layout";
import { PackageForm } from "../../../components";


class CarWashCreatePackage extends Component {

  _onSubmit = (data) => {
    console.log(data);
  };

  renderScreen = () => {
    const { navigation } = this.props;
    const carWash = this.props.navigation.getParam("carWash");
    const servicePrices = this.props.washes.servicePrices[carWash.id];
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
            corporationServiceId={carWash.id}
          />
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state)(CarWashCreatePackage);
