import React, { Component } from "react";
import { connect } from "react-redux";

import { HeaderLayout } from "../../../components/Layout";
import { Button, Container, Content, Icon } from "native-base";

import { asyncRequestAuth } from "../../../utils";

import ServiceForm from "../../../components/ServiceForm";
import actions from "../../../redux/washes/actions";


class NewPrice extends Component {

  _createHandler = body => {
    const url = "price";
    return asyncRequestAuth(url, "POST", "karma", body);
  };

  _onSaveServicePrice = servicePrice => {
    this.props.$addServicePrice(servicePrice);
  };

  render() {
    const { navigation } = this.props;
    const business = navigation.getParam("carWashData");
    return (
      <ServiceForm
        onFullSubmit={this._onSaveServicePrice}
        onSubmit={this._createHandler}
        business={business}
        isNew
      />
    );
  }

}


export default connect(state => state, { ...actions })(NewPrice);
