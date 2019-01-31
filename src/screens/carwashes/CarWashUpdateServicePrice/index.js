import React, { Component } from "react";
import { connect } from "react-redux";
import { asyncRequestAuth } from "../../../utils";


import ServiceForm from "../../../components/ServiceForm";
import actions from "../../../redux/washes/actions";


class UpdatePrice extends Component {

  _updateHandler = body => {
    const url = "price";
    return asyncRequestAuth(url, "PUT", "karma", body);
  };

  _onSaveServicePrice = servicePrices => {
    this.props.$updateServicePrice(servicePrices);
  };

  render() {
    const { navigation } = this.props;
    const business = navigation.getParam("carWash");
    const servicePrice = navigation.getParam("servicePrice");
    return (
      <ServiceForm
        onSubmit={this._updateHandler}
        onFullSubmit={this._onSaveServicePrice}
        business={business}
        servicePrice={servicePrice}
      />
    );
  }

}


export default connect(state => state, { ...actions })(UpdatePrice);
