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
    const {authenticated} = this.props.auth;
    if (authenticated) {
      this.props.navigation.navigate('App');
      return
    }
    if(!token) {
      this.props.navigation.navigate('Auth');
      return;
    }
    try {
      const {accessToken} = JSON.parse(token);
      const headers = {'Authorization': `Bearer ${accessToken}`};
      const user = await asyncRequest('user/me', 'GET', null, headers);
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
