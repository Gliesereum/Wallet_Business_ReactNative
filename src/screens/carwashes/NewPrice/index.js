import React, { Component } from "react";
import { HeaderLayout } from "../../../components/Layout";
import { Button, Container, Content, Icon } from "native-base";

import { asyncRequestAuth } from "../../../utils";

import ServiceForm from "../../../components/ServiceForm";


class NewPrice extends Component {

  _createHandler = body => {
    const url = "price";
    return asyncRequestAuth(url, "POST", "karma", body);
  };

  render() {
    const { navigation } = this.props;
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
            onFullSubmit={navigation.goBack}
            onSubmit={this._createHandler} isNew
            businessServiceId={carWash.id}
          />
        </Content>
      </Container>
    );
  }

}


export default NewPrice;
