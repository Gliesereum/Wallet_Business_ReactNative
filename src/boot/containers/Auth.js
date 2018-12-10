import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { Phone, Code } from '../../screens/auth';


const Auth = createStackNavigator({
  Phone: { screen: Phone, navigationOptions: {title: 'Авторизация'} },
  Code: {screen: Code, navigationOptions: {title: 'Введите код'}}
});

export default Auth;
