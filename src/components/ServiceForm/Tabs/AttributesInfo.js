import React, { Component } from "react";
import { View, Text } from "react-native";


class AttributesInfo extends Component {

  filterIncludes = id => {
    const { attributes } = this.props.service;
    const foundedIndex = attributes.findIndex(item => item.id === id);
    return foundedIndex !== -1;
  };

  renderFilterCategoryItem = filter => {
    const include = this.filterIncludes(filter.id);
    return (
      <View key={filter.id}>
        <Text>
          {filter.title}
        </Text>
      </View>
    );
  };

  renderFilterCategory = category => {
    const filtersList = category.attributes.map(this.renderFilterCategoryItem);
    return (
      <View key={category.id}>
        <Text>
          {category.title}
        </Text>
        {filtersList}
      </View>
    );
  };

  renderFiltersList = () => {
    return this.props.filters.map(this.renderFilterCategory);
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
