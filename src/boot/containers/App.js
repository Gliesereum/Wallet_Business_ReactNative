import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";


import Profile from '../../screens/profile';
import DashBoard from '../../screens/dashboard';

import EmailProfile from '../../screens/profile/email';
import IndividualProfile from '../../screens/profile/individual';
import MainProfile from '../../screens/profile/main';

import SideBar from '../../screens/sidebar';


const Drawer = createDrawerNavigator({
    DashBoard: {screen: DashBoard},
    Profile: {screen: Profile},
  },
  {
    initialRouteName: "Profile",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator({
    Drawer: { screen: Drawer },

    MainProfile: {screen: MainProfile},
    IndividualProfile: {screen: IndividualProfile},
    EmailProfile: {screen: EmailProfile},
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


export default AppNavigator;
