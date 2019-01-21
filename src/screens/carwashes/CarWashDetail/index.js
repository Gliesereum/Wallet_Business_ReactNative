import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import {
  Button,
  Container,
  Content,
  Icon,
  Text,
  ActionSheet,
  Tabs,
  Tab,
  ScrollableTab
} from "native-base";

import MainTab from "./tabs/mainTab";
import LocationTab from "./tabs/locationTab";
import PriceTab from "./tabs/priceTab";
import ScheduleTab from "./tabs/scheduleTab";
import PackageTab from "./tabs/packagesTab";

import { HeaderLayout } from "../../../components/Layout";

const deviceHeight = Dimensions.get("window").height;


const BUTTONS = [
  { text: "Основная информация", path: "UpdateCarWash" },
  { text: "Рассписание", path: "ScheduleCarWash" },
  { text: "Боксы", path: "BoxesCarWash" },
  { text: "Добавить Услугу", path: "NewPrice" },
  { text: "Добавить Пакет", path: "CreatePackage" },
  { text: "Отмена", path: "" }
];
const CANCEL_INDEX = 5;

const tabs = [
  { label: "Основная", node: MainTab },
  { label: "Локация", node: LocationTab },
  { label: "Услуги", node: PriceTab },
  { label: "Пакет Услуг", node: PackageTab },
  { label: "Рассписание", node: ScheduleTab }
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
        this.props.navigation.navigate(BUTTONS[buttonIndex].path, { carWashData: data, isNew: false });
      }
    );
  };

  _onServicePriceSelect = (servicePrice) => {
    const carWash = this.props.navigation.getParam("carWash");
    this.props.navigation.navigate("UpdatePrice", { servicePrice, carWash });
  };

  renderTabItem = tab => {
    const { label, node: Node } = tab;
    const carWashID = this.props.navigation.getParam("carWashID");
    const data = this.props.washes.washes.filter(item => item.id === carWashID)[0];
    const services = this.props.washes.servicePrices[carWashID];
    const packages = this.props.washes.servicePackages[carWashID];
    const carWash = { ...data, services, packages };
    console.log(carWash);
    debugger
    return (
      <Tab key={label} heading={label}>
        <Node {...carWash} onItemSelect={this._onServicePriceSelect}/>
      </Tab>
    );
  };

  renderScreen = () => {
    const { navigation } = this.props;
    const tabsList = tabs.map(this.renderTabItem);
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Информация"}
          right={(
            <Button transparent onPress={this._openSheetHandler}>
              <Text>Ред.</Text>
            </Button>
          )}
        />
        <Content>
          <Tabs renderTabBar={() => <ScrollableTab/>} style={{ height: deviceHeight }}>
            {tabsList}
          </Tabs>
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state)(InfoCarWash);
