import React, { Component } from "react";
import { View, Text } from "react-native";
import { asyncRequestAuth } from "../../../utils";
import { Button, Container, Content, Icon } from "native-base";


import ServiceForm from "../../../components/ServiceForm";
import { HeaderLayout } from "../../../components/Layout";


class UpdatePrice extends Component {

  _updateHandler = body => {
    const url = "price";
    return asyncRequestAuth(url, "PUT", "karma", body);
  };

  render() {
    const { navigation } = this.props;
    const carWash = navigation.getParam('carWash');
    const servicePrice = navigation.getParam("servicePrice");
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Обновить Услугу"}
        />
        <Content>
          <ServiceForm
            onSubmit={this._updateHandler}
            onFullSubmit={navigation.goBack}
            corporationServiceId={carWash.id}
            servicePrice={servicePrice}
          />
        </Content>
      </Container>
    );
  }

}


export default UpdatePrice;
