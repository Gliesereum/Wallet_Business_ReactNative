import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import Profile from "../../screens/profile";
import DashBoard from "../../screens/dashboard";
import CarWashes from '../../screens/carwashes';
import LogOut from '../../screens/logout';

import EmailProfile from "../../screens/profile/email";
import IndividualProfile from "../../screens/profile/individual";
import MainProfile from "../../screens/profile/main";

import NewCarWash from '../../screens/carwashes/newCarWash';

import SideBar from "../../screens/sidebar";
import InfoCarWash from '../../screens/carwashes/infoCarWash';


const Drawer = createDrawerNavigator({
    DashBoard: { screen: DashBoard },
    CarWashes: {screen: CarWashes},
    Profile: { screen: Profile },
    Logout: {screen: LogOut}
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

    MainProfile: { screen: MainProfile },
    IndividualProfile: { screen: IndividualProfile },
    EmailProfile: { screen: EmailProfile },

    NewCarWash: {screen: NewCarWash},
    InfoCarWash: {screen: InfoCarWash}
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


export default AppNavigator;
