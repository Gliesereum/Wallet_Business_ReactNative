import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'native-base';

const style = StyleSheet.create({
  container: {flex: 1},
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  }
});

import MapView, {Marker} from 'react-native-maps';


const LocationTab = ({latitude, longitude}) => {
  return (
    <View style={style.container}>
      <MapView
        provider="google"
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        style={style.map}
      >
        <Marker coordinate={{latitude, longitude}}/>
      </MapView>
    </View>
  );
};


export default LocationTab;
