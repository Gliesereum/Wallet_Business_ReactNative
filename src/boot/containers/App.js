import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import Profile from "../../screens/profile";
import CarWashes from "../../screens/carwashes/CarWashesList";
import LogOut from "../../screens/logout";

import Email from '../../screens/profile/Email';
import MainProfile from "../../screens/profile/main";

import BusinessList from '../../screens/profile/BusinessList';
import NewBusiness from '../../screens/profile/NewBusiness';
import UpdateBusiness from '../../screens/profile/UpdateBusiness';

import NewCarWash from "../../screens/carwashes/CarWashCreate";
import UpdateCarWash from "../../screens/carwashes/CarWashUpdate";
import ScheduleCarWash from "../../screens/carwashes/CarWashSchedule";
import BoxesCarWash from "../../screens/carwashes/CarWashBoxes";

import NewPrice from '../../screens/carwashes/CarWashNewServicePrice';
import UpdatePrice from '../../screens/carwashes/CarWashUpdateServicePrice';

import CarWashCreatePackage from '../../screens/carwashes/CarWashCreatePackage';
import CarWashUpdatePackage from '../../screens/carwashes/CarWashUpdatePackage';

import AddressInfo from "../../screens/addressinfo";

import SideBar from "../../screens/sidebar";
import InfoCarWash from "../../screens/carwashes/CarWashDetail";


const Drawer = createDrawerNavigator({
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

    NewPrice: {screen: NewPrice},
    UpdatePrice: {screen: UpdatePrice},

    CreatePackage: {screen: CarWashCreatePackage},
    UpdatePackage: {screen: CarWashUpdatePackage},

    AddressInfo: { screen: AddressInfo }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);


export default AppNavigator;
