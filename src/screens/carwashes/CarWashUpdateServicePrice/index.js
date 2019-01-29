import React, { Component } from "react";
import { connect } from "react-redux";
import { asyncRequestAuth } from "../../../utils";
import { Button, Container, Content, Icon } from "native-base";


import ServiceForm from "../../../components/ServiceForm";
import { HeaderLayout } from "../../../components/Layout";

import actions from "../../../redux/washes/actions";


class UpdatePrice extends Component {

  _updateHandler = body => {
    const url = "price";
    return asyncRequestAuth(url, "PUT", "karma", body);
  };

  _onFullSubmit = servicePrices => {
    this.props.$updateServicePrice(servicePrices);
  };

  render() {
    const { navigation } = this.props;
    const business = navigation.getParam("carWash");
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
            onFullSubmit={this._onFullSubmit}
            business={business}
            servicePrice={servicePrice}
          />
        </Content>
      </Container>
    );
  }

}


export default connect(state => state, { ...actions })(UpdatePrice);
