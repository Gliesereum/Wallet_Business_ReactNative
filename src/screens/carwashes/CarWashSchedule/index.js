import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  Icon,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
  CheckBox,
  Toast
} from "native-base";

import { TimePicker } from "../../../components";
import HeaderLayout from "../../../components/Layout/Header";
import { asyncRequestAuth } from "../../../utils";

import appActions from "../../../redux/app/actions";
import washActions from "../../../redux/washes/actions";


const styles = StyleSheet.create({});

const initStartDay = 946706400000;
const initEndDay = 946749600000;

const weekDays = [
  { dayOfWeek: "MONDAY", label: "Понедельник", from: initStartDay, to: initEndDay, isWork: false, carServiceType: "CAR_WASH" },
  { dayOfWeek: "TUESDAY", label: "Вторник", from: initStartDay, to: initEndDay, isWork: false, carServiceType: "CAR_WASH" },
  { dayOfWeek: "WEDNESDAY", label: "Среда", from: initStartDay, to: initEndDay, isWork: false, carServiceType: "CAR_WASH" },
  { dayOfWeek: "THURSDAY", label: "Четверг", from: initStartDay, to: initEndDay, isWork: false, carServiceType: "CAR_WASH" },
  { dayOfWeek: "FRIDAY", label: "Пятница", from: initStartDay, to: initEndDay, isWork: false, carServiceType: "CAR_WASH" },
  { dayOfWeek: "SATURDAY", label: "Суббота", from: initStartDay, to: initEndDay, isWork: false, carServiceType: "CAR_WASH" },
  { dayOfWeek: "SUNDAY", label: "Воскресенье", from: initStartDay, to: initEndDay, isWork: false, carServiceType: "CAR_WASH" }
];


class index extends Component {

  state = { data: weekDays };

  componentDidMount() {
    this._initForm();
  }

  onSubmit = () => {
    const isNew = this.props.navigation.getParam("isNew");
    const carWashData = this.props.navigation.getParam("carWashData");
    const newSchedule = isNew || carWashData.workTimes.length !== 7;
    newSchedule ? this._submitNewSchedule() : this._updateExistingSchedule();
  };

  _submitNewSchedule = async () => {
    const url = "work-time";
    const method = "POST";
    const { $globalSpinnerOn, $globalSpinnerOff, $addSchedule, navigation } = this.props;
    const carWashData = navigation.getParam("carWashData");
    const requests = this.state.data.map(day => this._createPromise(url, method, day));
    try {
      await $globalSpinnerOn();
      const schedule = await Promise.all(requests);
      await $addSchedule(schedule);
      await navigation.navigate("BoxesCarWash", { carWashData: carWashData });
      await Toast.show({ text: "Успешно обновлено" });
    } catch (e) {
      const error = e;
      debugger
    } finally {
      await $globalSpinnerOff();
    }

  };

  _updateExistingSchedule = async () => {
    const url = "work-time";
    const method = "PUT";
    const { $globalSpinnerOn, $globalSpinnerOff, $updateSchedule } = this.props;
    const requests = this.state.data.map(day => this._createPromise(url, method, day));
    try {
      await $globalSpinnerOn();
      const schedule = await Promise.all(requests);
      await $updateSchedule(schedule);
      await this.props.navigation.goBack();
      await Toast.show({ text: "Успешно обновлено" });
    } catch (e) {
      const error = e;
      debugger
    } finally {
      await $globalSpinnerOff();
    }
  };

  _createPromise = (url, method, day) => {
    const carWashData = this.props.navigation.getParam("carWashData");
    const body = { ...day, corporationServiceId: carWashData.id };
    return asyncRequestAuth(url, method, "karma", body);
  };

  _initForm = () => {
    const { data } = this.state;
    this.setState(state => ({
      ...state,
      data: data.map(this._combineDay)
    }));
  };

  _combineDay = (day) => {
    const { navigation } = this.props;
    const { workTimes } = navigation.getParam("carWashData");
    const dayFromServer = workTimes.filter(item => item.dayOfWeek === day.dayOfWeek)[0];
    if (!dayFromServer) {
      return day;
    }
    return { ...day, ...dayFromServer };
  };

  _checkHandler = item => {
    const { data } = this.state;
    const changedDay = data.filter(day => item.dayOfWeek === day.dayOfWeek)[0];
    const changedIndex = data.map(item => item.dayOfWeek).indexOf(item.dayOfWeek);
    const newDay = { ...changedDay, isWork: !changedDay.isWork };
    const newArray = [
      ...data.slice(0, changedIndex),
      newDay,
      ...data.slice(changedIndex + 1, data.length)
    ];
    this.setState(state => ({
      ...state,
      data: newArray
    }));
  };

  _timeHandler = (item, timeCase, time) => {
    const { data } = this.state;
    const changedDay = data.filter(day => item.dayOfWeek === day.dayOfWeek)[0];
    const changedIndex = data.map(item => item.dayOfWeek).indexOf(item.dayOfWeek);
    const newDay = { ...changedDay, [timeCase]: time };
    const newArray = [
      ...data.slice(0, changedIndex),
      newDay,
      ...data.slice(changedIndex + 1, data.length)
    ];
    this.setState(state => ({
      ...state,
      data: newArray
    }));
  };

  renderDayItem = item => {
    const { _timeHandler, _checkHandler } = this;
    return (
      <ListItem>
        <Left style={{ flex: 1 }}>
          <CheckBox
            checked={item.isWork}
            onPress={() => _checkHandler(item)}
          />
        </Left>
        <Body style={{ flex: 2 }}>
        <Text>
          {item.label}
        </Text>
        </Body>
        <Right style={{ flex: 2, justifyContent: "space-around", flexDirection: "row" }}>
          <TimePicker time={item.from} onChange={time => _timeHandler(item, "from", time)}/>
          <Text> - </Text>
          <TimePicker time={item.to} onChange={time => _timeHandler(item, "to", time)}/>
        </Right>
      </ListItem>
    );
  };

  renderDaysList = () => {
    return (
      <List
        dataArray={this.state.data}
        renderRow={this.renderDayItem}
      />
    );
  };

  renderScreen = () => {
    const isNew = this.props.navigation.getParam("isNew");
    return (
      <Container>
        <HeaderLayout
          left={
            !isNew && (
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back"/>
              </Button>
            )
          }
          body={"Рассписание"}
          right={(
            <Button transparent onPress={() => this.onSubmit()}>
              <Text>Сохр.</Text>
            </Button>
          )}
        />
        <Content>
          {this.renderDaysList()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...washActions }))(index);
