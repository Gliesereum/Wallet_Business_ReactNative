import React from "react";
import { createStackNavigator } from "react-navigation";

import { Phone, Code } from "../../screens/auth";


const Auth = createStackNavigator({
  Phone: { screen: Phone, navigationOptions: { header: null } },
  Code: { screen: Code, navigationOptions: { header: null } }
});

export default Auth;
