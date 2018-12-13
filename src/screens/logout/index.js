import React from 'react';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';

import authActions from '../../redux/auth/actions';


const LogOut = ({navigation, $logOut}) => {
  AsyncStorage.removeItem('token');
  $logOut();
  navigation.navigate('Auth');
  return null;
};


export default connect(state=>state, {...authActions})(LogOut);
