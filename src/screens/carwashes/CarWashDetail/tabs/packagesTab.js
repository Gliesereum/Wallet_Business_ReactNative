import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";


const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});


const PackageTab = ({ packages }) => {

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyList}>
        <Text>Пустой Список</Text>
      </View>
    );
  };

  const renderPackageItem = item => {
    return (
      <View key={item.id}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const renderPackagesList = () => {
    return packages.map(renderPackageItem);
  };


  return packages ? renderPackagesList() : renderEmptyList();
};


export default PackageTab;
