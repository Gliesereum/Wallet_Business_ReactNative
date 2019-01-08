import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";


import GoogleAddressAutoComplete from "./children/addressAutocomplete";
import Map from "./children/map";
import config from '../../config';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: 64
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  input: {
    position: "absolute",
    top: 25,
    backgroundColor: "#fff",
    borderRadius: 5,
    zIndex: 25,
    flex: 1,
    left: 15,
    right: 15
  }
});


class AddressForm extends Component {

  state = {
    location: null,
    address: ""
  };

  componentDidMount() {
    this._initForm();
  }

  _initForm = () => {
    const { location, address } = this.props;
    this.setState(state => ({
      ...state,
      location,
      address
    }));
  };

  _onInput = key => value => {
    this.setState(state => ({ ...state, [key]: value }));
  };

  _getPlaceInfo = async id => {
    const {GOOGLE_KEY} = config;
    const URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&fields=geometry&key=${GOOGLE_KEY}`;
    const request = await fetch(URL);
    return await request.json();
  };

  _onSelectFromInput = async address => {
    const { onChangeLocation } = this.props;
    this._onInput("address")(address.description);
    const { result: { geometry: { location: { lat, lng } } } } = await this._getPlaceInfo(address.place_id);
    this._onInput("location")({ latitude: lat, longitude: lng });
    const location = { latitude: lat, longitude: lng };
    onChangeLocation({ location: location, address: address.description });
  };

  _onSelectFromMap = async ({ coordinate }) => {
    const { onChangeLocation } = this.props;
    const {GOOGLE_KEY} = config;
    const { latitude, longitude } = coordinate;
    this._onInput("location")({ latitude, longitude });
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${GOOGLE_KEY}`;
    const request = await fetch(URL);
    const { results } = await request.json();
    const address = results[0];
    this._onInput("address")(address.formatted_address);
    onChangeLocation({ location: { latitude, longitude }, address: address.formatted_address });
  };

  _confirm = fn => argv => {
    Alert.alert(
      "Переместить",
      "или установить точку тут?",
      [
        { text: "Отмена", style: "cancel" },
        { text: "OK", onPress: () => fn(argv) }
      ],
      { cancelable: false }
    );
  };

  renderMap = () => {
    const { address, location } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <GoogleAddressAutoComplete onSelect={this._onSelectFromInput} query={address}/>
        </View>
        <View style={styles.map}>
          <Map
            location={location}
            onMapSelect={this._confirm(this._onSelectFromMap)}
            style={styles.map}
          />
        </View>

      </View>
    );
  };

  render() {
    return this.renderMap();
  }

}


export default AddressForm;
