import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";


const styles = StyleSheet.create({
  emptyList: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});

const PriceTab = ({ services }) => {

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text>Пустой список</Text>
      </View>
    );
  };

  const renderItemPrice = item => {
    return (
      <View key={item.id}>
        <Text>{item.id}</Text>
      </View>
    );
  };

  const renderList = () => {
    return (
      <View>
        {services.map(renderItemPrice)}
      </View>
    );
  };

  return services.length ? renderList() : renderEmptyList();

};


export default PriceTab;
