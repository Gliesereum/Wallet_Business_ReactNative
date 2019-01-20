import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text, List, ListItem } from "native-base";


const styles = StyleSheet.create({
  emptyList: { flex: 1, justifyContent: "center", alignItems: "center" }
});

const PriceTab = ({ services, onItemSelect }) => {

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text>Пустой список</Text>
      </View>
    );
  };

  const renderItemPrice = item => {
    return (
      <ListItem
        key={item.id}
        onPress={() => onItemSelect(item)}
      >
        <Text>{item.name}</Text>
      </ListItem>
    );
  };

  const renderList = () => {
    return (
      <List>
        {services.map(renderItemPrice)}
      </List>
    );
  };

  return services.length ? renderList() : renderEmptyList();

};


export default PriceTab;
