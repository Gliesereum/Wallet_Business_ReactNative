import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Text, List, ListItem } from "native-base";


const styles = StyleSheet.create({
  emptyList: { flex: 1, justifyContent: "center", alignItems: "center" }
});

const PriceTab = ({ packages, onItemSelect, onPackageDelete }) => {

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text>Пустой список</Text>
      </View>
    );
  };

  const renderItemPackage = item => {
    return (
      <ListItem
        key={item.id}
        onPress={() => onItemSelect(item)}
        onLongPress={onPackageDelete(item.id)}
      >
        <Text>{item.name}</Text>
      </ListItem>
    );
  };

  const renderList = () => {
    return (
      <List>
        {packages.map(renderItemPackage)}
      </List>
    );
  };

  return packages ? renderList() : renderEmptyList();

};


export default PriceTab;
