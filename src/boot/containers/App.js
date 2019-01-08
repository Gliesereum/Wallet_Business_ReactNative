import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import Profile from "../../screens/profile";
import DashBoard from "../../screens/dashboard";
import CarWashes from "../../screens/carwashes";
import LogOut from "../../screens/logout";

import Email from '../../screens/profile/Email';
import MainProfile from "../../screens/profile/main";

import BusinessList from '../../screens/profile/BusinessList';
import NewBusiness from '../../screens/profile/NewBusiness';
import UpdateBusiness from '../../screens/profile/UpdateBusiness';

import NewCarWash from "../../screens/carwashes/newCarWash";
import UpdateCarWash from "../../screens/carwashes/updateCarWash";
import ScheduleCarWash from "../../screens/carwashes/scheduleCarWash";
import BoxesCarWash from "../../screens/carwashes/boxesCarWash";

import AddressInfo from "../../screens/addressinfo";

import SideBar from "../../screens/sidebar";
import InfoCarWash from "../../screens/carwashes/infoCarWash";


const Drawer = createDrawerNavigator({
    DashBoard: { screen: DashBoard },
    CarWashes: { screen: CarWashes },
    Profile: { screen: Profile },
    Logout: { screen: LogOut }
  },
  {
    initialRouteName: "CarWashes",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = createStackNavigator({
    Drawer: { screen: Drawer },

    MainProfile: { screen: MainProfile },
    EmailProfile: { screen: Email },

    BusinessList: { screen: BusinessList },
    NewBusiness: {screen: NewBusiness},
    UpdateBusiness: {screen: UpdateBusiness},

    NewCarWash: { screen: NewCarWash },
    UpdateCarWash: { screen: UpdateCarWash },
    ScheduleCarWash: { screen: ScheduleCarWash },
    BoxesCarWash: { screen: BoxesCarWash },
    InfoCarWash: { screen: InfoCarWash },
    AddressInfo: { screen: AddressInfo }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


export default AppNavigator;
