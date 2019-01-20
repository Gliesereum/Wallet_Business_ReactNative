import React, { Component } from "react";
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

import MainTab from "./children/mainTab";
import LocationTab from "./children/locationTab";
import PriceTab from "./children/priceTab";
import ScheduleTab from "./children/scheduleTab";
import PackageTab from "./children/packagesTab";

import { HeaderLayout } from "../../../components/Layout";
import { asyncRequestAuth } from "../../../utils";

const deviceHeight = Dimensions.get("window").height;


const BUTTONS = [
  { text: "Основная информация", path: "UpdateCarWash" },
  { text: "Рассписание", path: "ScheduleCarWash" },
  { text: "Боксы", path: "BoxesCarWash" },
  { text: "Добавить Услугу", path: "NewPrice" },
  { text: "Добавить Пакет", path: "BoxesCarWash" },
  { text: "Отмена", path: "" }
];
const CANCEL_INDEX = 5;

const tabs = [
  { label: "Основная", node: MainTab },
  { label: "Локация", node: LocationTab },
  { label: "Услуги", node: PriceTab },
  { label: "Пакет Услуг", node: PackageTab },
  { label: "Рассписание", node: ScheduleTab },
];


class InfoCarWash extends Component {

  state = { services: [], packages: [] };

  componentDidMount() {
    this._initScreen();
  }

  _initScreen = async () => {
    const carWash = this.props.navigation.getParam("carWash");
    const servicesURL = `price/by-corporation-service/${carWash.id}`;
    const packagesURL = `package/by-corporation-service/${carWash.id}`;
    try {
      const services = await asyncRequestAuth(servicesURL);
      const packages = await asyncRequestAuth(packagesURL);
      this._onInput("services", services || []);
      this._onInput("packages", packages || []);
    } catch (e) {
      const error = e;
    }
  };

  _onInput = (key, value) => {
    this.setState(state => ({ ...state, [key]: value }));
  };

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
    const data = this.props.navigation.getParam("carWash");
    const { services, packages } = this.state;
    const carWash = { ...data, services, packages };
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


export default InfoCarWash;
