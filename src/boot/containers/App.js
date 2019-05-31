import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

import Profile from "../../screens/profile";
import CarWashes from "../../screens/business/CarWashesList";
import LogOut from "../../screens/logout";

import Email from '../../screens/profile/Email';
import MainProfile from "../../screens/profile/main";

import CorporationsList from '../../screens/profile/CorporationsList';
import NewBusiness from '../../screens/profile/NewBusiness';
import UpdateBusiness from '../../screens/profile/UpdateBusiness';

import NewCarWash from "../../screens/business/CarWashCreate";
import UpdateCarWash from "../../screens/business/CarWashUpdate";
import ScheduleCarWash from "../../screens/business/CarWashSchedule";
import BoxesCarWash from "../../screens/business/CarWashBoxes";

import NewPrice from '../../screens/business/CarWashNewServicePrice';
import UpdatePrice from '../../screens/business/CarWashUpdateServicePrice';

import CarWashCreatePackage from '../../screens/business/CarWashCreatePackage';
import CarWashUpdatePackage from '../../screens/business/CarWashUpdatePackage';

import AddressInfo from "../../screens/addressinfo";

import SideBar from "../../screens/sidebar";
import InfoCarWash from "../../screens/business/CarWashDetail";


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

    CorporationsList: { screen: CorporationsList },
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
