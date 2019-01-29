import React, { Component } from "react";
import { View, Text } from "react-native";
import { Body, ListItem, Right, Switch } from "native-base";


class ClassInfo extends Component {

  _onSubmit = priceClass => event => {
    return event ?
      this.props.onAddClassToPrice(priceClass) :
      this.props.onRemoveClassFromPrice(priceClass);
  };

  _classSwitched = serviceClass => {
    const { servicePrice } = this.props;
    const index = servicePrice.serviceClass.findIndex(item => item.id === serviceClass.id);
    return index !== -1;
  };

  renderPriceClassItem = item => {
    const switched = this._classSwitched(item);
    return (
      <ListItem key={item.id}>
        <Body>
        <Text>{item.name}</Text>
        </Body>
        <Right>
          <Switch
            value={switched}
            trackColor="#50B948"
            onValueChange={this._onSubmit(item)}
          />
        </Right>
      </ListItem>
    );
  };

  render() {
    return this.props.serviceClass.map(this.renderPriceClassItem);
  }

}


export default ClassInfo;
