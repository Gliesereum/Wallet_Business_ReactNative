import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage } from 'react-native';
import { View, Text } from 'native-base';

import {asyncRequest, delay} from '../../utils';
import appActions from '../../redux/app/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


class Loading extends Component {

  componentDidMount() {
    this.initApp();
  };

  initApp = async () => {
    const token = await AsyncStorage.getItem('token');
    await delay(100);
    if(!token) {
      this.props.navigation.navigate('Auth');
      return;
    }
    try {
      const {} = JSON.parse(token);
      const user = await asyncRequest('');
    }
    catch (e) {
      this.props.navigation.navigate('Auth');
    }
  };

  _renderLoading = () => {
    return (
      <View style={styles.container}><Text>Loading...</Text></View>
    );
  };

  render() {
    return this._renderLoading();
  }

}


export default connect(state => state, ({ ...appActions }))(Loading);
