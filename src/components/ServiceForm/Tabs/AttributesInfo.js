import React, {Component, Fragment} from "react";
import {View, Text} from "react-native";

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
    const {service} = this.props;
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

  renderFiltersList = () => {
    const renderFilters = this.props.filters.map(this.renderFilterCategory);
    return (
      <View>
        <Text style={{textAlign: 'center', paddingVertical: 8}}>Если хотите чтобы услуга была доступна всем. Оставьте пустым.</Text>
        {renderFilters}
      </View>
    )
  };

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
