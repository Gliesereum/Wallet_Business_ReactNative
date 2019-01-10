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
  { label: "Рассписание", node: ScheduleTab }
];


class InfoCarWash extends Component {

  state = { services: [] };

  componentDidMount() {
    this._initScreen();
  }

  _initScreen = async () => {
    const carWash = this.props.navigation.getParam("carWash");
    const servicesURL = `price/by-business-service/${carWash.id}`;
    try {
      const services = await asyncRequestAuth(servicesURL);
      this._onInput("services", services || []);
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

  renderTabItem = item => {
    const data = this.props.navigation.getParam("carWash");
    const carWash = { ...data, services: this.state.services };
    return (
      <Tab key={item.label} heading={item.label}>
        <item.node {...carWash} onItemSelect={this._onServicePriceSelect}/>
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
