// @flow
import React from 'react';

import {Dimensions, StyleSheet} from 'react-native';
import {View, Text, Icon} from 'native-base';

let deviceHeight = Dimensions.get('window').height - 120;

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    color: '#c0c0c0',
    textAlign: 'center'
  },
  text: {
    color: '#c0c0c0',
    fontSize: 32,
    textAlign: 'center'
  }
});

type P = {
  message?: string
}

const EmptyScreen = (props: P) => {
  return (
    <View style={styles.container}>
      <Icon name={'archive'} style={styles.icon}/>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
};

EmptyScreen.defaultProps = {
  message: 'Пустой список.'
};

export default EmptyScreen;