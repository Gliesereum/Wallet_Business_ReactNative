import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Dimensions, Image } from "react-native";
import {
  Button,
  Container,
  Icon,
  Text,
  ActionSheet,
  Tabs,
  Tab,
  ScrollableTab,
  Toast,
  Body,
  Header,
  Left,
  Right
} from "native-base";

import appActions from "../../../redux/app/actions";
import businessActions from "../../../redux/washes/actions";

import withLoadData from './withLoadData';


const headerLogo = require("../../../../assets/images/coupler-logo-hedaer.png");

import MainTab from "./tabs/mainTab";
import LocationTab from "./tabs/locationTab";
import PriceTab from "./tabs/priceTab";
import ScheduleTab from "./tabs/scheduleTab";
import PackageTab from "./tabs/packagesTab";
import OrdersTab from "./tabs/ordersTab";

import { asyncRequestAuth } from "../../../utils";

const deviceHeight = Dimensions.get("screen").height;


const BUTTONS = [
  { text: "Основная информация", path: "UpdateCarWash" },
  { text: "Рассписание", path: "ScheduleCarWash" },
  { text: "Рабочее пространство", path: "BoxesCarWash" },
  { text: "Добавить Услугу", path: "NewPrice" },
  { text: "Добавить Пакет", path: "CreatePackage" },
  { text: "Отмена", path: "" }
];

const CANCEL_INDEX = 6;

const tabs = [
  { label: "Основная", key: "main", node: MainTab },
  { label: "Локация", "key": "location", node: LocationTab },
  { label: "Услуги", key: "services", node: PriceTab },
  { label: "Пакет Услуг", key: "packages", node: PackageTab },
  { label: "Рассписание", key: "schedule", node: ScheduleTab },
  { label: "Отчеты", key: "schedule", node: OrdersTab }
];


class InfoCarWash extends Component {

  _openSheetHandler = () => {
    const data = this.props.navigation.getParam("carWash");
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Редактировать"
      },
      buttonIndex => {
        try {
          this.props.navigation.navigate(BUTTONS[buttonIndex].path, { carWashData: data, isNew: false });
        }
        catch (e) {

        }
      }
    );
  };

  _onServicePriceSelect = (servicePrice) => {
    const carWash = this.props.navigation.getParam("carWash");
    this.props.navigation.navigate("UpdatePrice", { servicePrice, carWash });
  };

  _onPackagePricesSelect = packageServices => {
    const carWash = this.props.navigation.getParam("carWash");
    this.props.navigation.navigate("UpdatePackage", { packageServices, carWash });
  };

  _deleteServicePriceHandler = async servicePriceId => {
    const url = `price/${servicePriceId}`;
    const businessId = this.props.navigation.getParam("carWashID");
    try {
      await this.props.$globalSpinnerOn();
      await asyncRequestAuth(url, "DELETE", "karma");
      await this.props.$removeServicePrice({ servicePriceId, businessId });
      await Toast.show({ text: "Успешно удалено" });
    } catch (e) {
      console.log(e);
      Toast.show({ text: "Ошибка" });
    } finally {
      await this.props.$globalSpinnerOff();
    }
  };

  _deleteAlertOpenHandler = servicePriceId => () => {
    Alert.alert(
      "Удалить Услугу?",
      null,
      [
        { text: "Удалить", onPress: () => this._deleteServicePriceHandler(servicePriceId) },
        {
          text: "Отмена",
          onPress: () => {
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  _deletePackageHandler = async packageId => {
    const url = `package/${packageId}`;
    const businessId = this.props.navigation.getParam("carWashID");
    try {
      await this.props.$globalSpinnerOn();
      await asyncRequestAuth(url, "DELETE", "karma");
      await this.props.$removePackage({ packageId, businessId });
      await Toast.show({ text: "Успешно удалено" });
    } catch (e) {
      console.log(e);
      Toast.show({ text: "Ошибка" });
    } finally {
      await this.props.$globalSpinnerOff();
    }
  };

  _deletePackageAlertOpenHandler = packageId => () => {
    Alert.alert(
      "Удалить Услугу?",
      null,
      [
        { text: "Удалить", onPress: () => this._deletePackageHandler(packageId) },
        {
          text: "Отмена",
          onPress: () => {
          },
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  renderTabItem = tab => {
    const { label, node: Node } = tab;
    const { _deleteAlertOpenHandler, _deletePackageAlertOpenHandler } = this;
    const carWashID = this.props.navigation.getParam("carWashID");
    const data = this.props.washes.washes.filter(item => item.id === carWashID)[0];
    const services = this.props.washes.servicePrices[carWashID];
    const packages = this.props.washes.servicePackages[carWashID];
    const carWash = { ...data, services, packages };
    const onSelectItem = tab.key === "services" ? this._onServicePriceSelect : this._onPackagePricesSelect;
    return (
      <Tab key={label} heading={label}>
        <Node
          {...carWash}
          onItemSelect={onSelectItem}
          onServicePriceDelete={_deleteAlertOpenHandler}
          onPackageDelete={_deletePackageAlertOpenHandler}
        />
      </Tab>
    );
  };

  renderScreen = () => {
    const { navigation } = this.props;
    const tabsList = tabs.map(this.renderTabItem);
    return (
      <Container style={{ height: deviceHeight - Header.HEIGHT + 20 }}>

        <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>

          <Body>
            <Image
              source={headerLogo}
              style={{ resizeMode: "contain", width: "100%" }}
            />
          </Body>

          <Right>
            <Button transparent onPress={this._openSheetHandler}>
              <Text>Ред.</Text>
            </Button>
          </Right>
        </Header>

        <Tabs
          tabBarPosition={"bottom"}
          renderTabBar={() => <ScrollableTab/>}
        >
          {tabsList}
        </Tabs>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(
  state => state,
  ({ ...appActions, ...businessActions }))
(withLoadData(InfoCarWash));
