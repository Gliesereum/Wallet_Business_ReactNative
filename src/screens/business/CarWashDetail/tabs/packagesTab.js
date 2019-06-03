import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, List, ListItem } from "native-base";
import {EmptyScreen} from "../../../../components";


const styles = StyleSheet.create({
  emptyList: { flex: 1, justifyContent: "center", alignItems: "center" }
});

const PriceTab = ({ packages, onItemSelect, onPackageDelete }) => {

  const renderEmptyList = () => {
    return <EmptyScreen message={'Пустой список'}/>
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
      <ScrollView>
        <List>
          {packages.map(renderItemPackage)}
        </List>
      </ScrollView>
    );
  };

  return packages ? renderList() : renderEmptyList();

};


export default PriceTab;
