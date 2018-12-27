import React, {Component} from 'react';
import { View, Text, Content } from "native-base";

const MainTab = data => {
  return (
    <View>
      <View><Text>Название: {data.name}</Text></View>
      <View><Text>Количество Боксов: {data.spaces.length}</Text></View>
      <View><Text>Адрес: {data.address}</Text></View>
      <View><Text>Описание: {data.description}</Text></View>
    </View>
  );
};


export default MainTab;
