import React, { Component } from "react";
import { Alert } from "react-native";

import { AddressForm } from "../../components";
import { HeaderLayout } from "../../components/Layout";
import { Button, Container, Text } from "native-base";


class AddressInfo extends Component {

  state = { address: "", location: null };

  componentWillMount() {
    this._initScreen();
  }

  _initScreen = () => {
    const { navigation } = this.props;
    const location = navigation.getParam("location");
    const address = navigation.getParam("address");
    this.setState(state => ({ ...state, location, address }));
  };

  _changeLocation = ({ address, location }) => {
    this.setState(state => ({ ...state, address, location }));
  };

  _formValid = () => {
    const { address, location } = this.state;
    return !!address.length;
  };

  _submitHandler = () => {
    const formValid = this._formValid();
    const onSubmit = this.props.navigation.getParam("onSubmit");
    if (!formValid) {
      Alert.alert("Выберите точку на карте или выберите адрес из списка");
      return;
    }
    onSubmit(this.state);
    this.props.navigation.goBack();
  };

  renderScreen = () => {
    return (
      <Container>
        <HeaderLayout
          body={"Локация"}
          right={(
            <Button onPress={this._submitHandler} transparent>
              <Text>Сохр.</Text>
            </Button>
          )}
        />
        <AddressForm {...this.state} onChangeLocation={this._changeLocation}/>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }
}


export default AddressInfo;
