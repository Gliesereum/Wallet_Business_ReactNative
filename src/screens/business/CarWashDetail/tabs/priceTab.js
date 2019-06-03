import React from "react";
import {StyleSheet, ScrollView} from "react-native";
import {View, Text, List, ListItem} from "native-base";
import {EmptyScreen} from "../../../../components";


const styles = StyleSheet.create({
  emptyList: {flex: 1, justifyContent: "center", alignItems: "center"}
});

const PriceTab = ({services, onItemSelect, onServicePriceDelete}) => {

  const renderEmptyList = () => {
    return <EmptyScreen message={'Пустой список'}/>
  };

  const renderItemPrice = item => {
    return (
      <ListItem
        key={item.id}
        onPress={() => onItemSelect(item)}
        onLongPress={onServicePriceDelete(item.id)}
      >
        <Text>{item.name}</Text>
      </ListItem>
    );
  };

  const renderList = () => {
    return (
      <ScrollView>
        <List>
          {services.map(renderItemPrice)}
        </List>
      </ScrollView>
    );
  };

  return services ? renderList() : renderEmptyList();

};


export default PriceTab;
