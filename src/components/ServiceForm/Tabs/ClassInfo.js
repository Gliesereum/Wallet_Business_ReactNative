import React, {Component} from "react";
import {View, Text} from "react-native";
import {Body, ListItem, Right, Switch} from "native-base";


class ClassInfo extends Component {

  _onSubmit = priceClass => event => {
    return event ?
      this.props.onAddClassToPrice(priceClass) :
      this.props.onRemoveClassFromPrice(priceClass);
  };

  _classSwitched = serviceClass => {
    const {servicePrice} = this.props;
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

  renderSwitches = () => {
    return (
      <View>
        <Text
          style={{textAlign: 'center', paddingVertical: 8}
          }>
          Если хотите чтобы услуга была доступна всем. Оставьте пустым.
        </Text>
        {this.props.serviceClass.map(this.renderPriceClassItem)}
      </View>
    )
  };

  renderEmptySwitches = () => {
    return (
      <View>
        <Text style={{textAlign: 'center'}}>
          Нет фильтров. Обратитесь к администратору.
        </Text>
      </View>
    )
  };

  render() {
    return !this.props.serviceClass && this.props.serviceClass.length ? this.renderSwitches() : this.renderEmptySwitches()
  }

}


export default ClassInfo;
