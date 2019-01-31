import React, { Component } from "react";
import { View, Text } from "react-native";

import ServiceInput from "../children/Input";


class AttributesInfo extends Component {

  _pushRemoveFilterHandler = (checked, filter) => {
    if (checked) {
      this.props.onRemoveFilter(filter);
      return;
    }
    this.props.onAddFilter(filter);
  };

  renderFilterCategory = category => {
    const { service } = this.props;
    return (
      <ServiceInput
        type={"array"}
        label={category.title}
        key={category.title}
        value={service.attributes}
        onChange={this._pushRemoveFilterHandler}
        options={category.attributes}
      />
    );
  };

  renderFiltersList = () => this.props.filters.map(this.renderFilterCategory);

  renderEmptyList = () => {
    return (
      <View>
        <Text>Нет фильтров для добавления. Обратитесь к администратору.</Text>
      </View>
    );
  };

  render() {
    return this.props.filters.length ? this.renderFiltersList() : this.renderEmptyList();
  }

}


export default AttributesInfo;
