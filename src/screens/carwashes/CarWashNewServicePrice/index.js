import React, {Component} from "react";
import {connect} from "react-redux";

import {HeaderLayout} from "../../../components/Layout";
import {Button, Container, Content, Icon} from "native-base";

import {asyncRequestAuth} from "../../../utils";

import ServiceForm from "../../../components/ServiceForm";
import actions from '../../../redux/washes/actions';


class NewPrice extends Component {

  _createHandler = body => {
    const url = "price";
    return asyncRequestAuth(url, "POST", "karma", body);
  };

  _onFullSubmit = carWash => {
    this.props.$addServicePrice(carWash)
  };

  render() {
    const {navigation} = this.props;
    const carWash = navigation.getParam("carWashData");
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Добавить Услугу"}
        />
        <Content>
          <ServiceForm
            onFullSubmit={this._onFullSubmit}
            onSubmit={this._createHandler}
            corporationServiceId={carWash.id}
            isNew
          />
        </Content>
      </Container>
    );
  }

}


export default connect(state => state, {...actions})(NewPrice);
