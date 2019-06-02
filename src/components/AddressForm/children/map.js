// @flow
import React from "react";

import MapView, { Marker } from "react-native-maps";

const pin = require('../../../../assets/images/pin.png');


const defaultLocation = {
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
  latitude: 50.4220293,
  longitude: 30.4747438
};

const markerDelta = {
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0025
};


const Map = ({ location, style, onMapSelect }) => {
  const locationParameters = location.latitude && location.longitude ? { ...markerDelta, ...location } : defaultLocation;
  const { latitudeDelta, longitudeDelta, latitude, longitude } = locationParameters;
  return (
    <MapView
      style={style}
      provider="google"
      region={{
        latitude: +latitude,
        longitude: +longitude,
        latitudeDelta: +latitudeDelta,
        longitudeDelta: +longitudeDelta
      }}
      onPress={e => onMapSelect(e.nativeEvent)}
      animateCamera={{ duration: 3 }}
    >
      {location.latitude && location.longitude ? (
        <Marker
          image={pin}
          coordinate={{
            latitude: +latitude,
            longitude: +longitude,
            latitudeDelta: +latitudeDelta,
            longitudeDelta: +longitudeDelta
          }}/>
      ) : null}
    </MapView>
  );
};


Map.defaultProps = defaultLocation;


export default Map;
