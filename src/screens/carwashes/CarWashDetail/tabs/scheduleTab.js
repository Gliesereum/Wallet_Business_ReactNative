import React, { Component } from "react";
import { Text, Left, Body, Right, ListItem } from "native-base";

import moment from "moment";

const initStartDay = 946706400000;
const initEndDay = 946749600000;

const weekDays = [
  {
    dayOfWeek: "MONDAY",
    label: "Понедельник:",
    from: initStartDay,
    to: initEndDay,
    isWork: false,
    carServiceType: "CAR_WASH",
    index: 0
  },
  {
    dayOfWeek: "TUESDAY",
    label: "Вторник:",
    from: initStartDay,
    to: initEndDay,
    isWork: false,
    carServiceType: "CAR_WASH",
    index: 1
  },
  {
    dayOfWeek: "WEDNESDAY",
    label: "Среда:",
    from: initStartDay,
    to: initEndDay,
    isWork: false,
    carServiceType: "CAR_WASH",
    index: 2
  },
  {
    dayOfWeek: "THURSDAY",
    label: "Четверг:",
    from: initStartDay,
    to: initEndDay,
    isWork: false,
    carServiceType: "CAR_WASH",
    index: 3
  },
  {
    dayOfWeek: "FRIDAY",
    label: "Пятница:",
    from: initStartDay,
    to: initEndDay,
    isWork: false,
    carServiceType: "CAR_WASH",
    index: 4
  },
  {
    dayOfWeek: "SATURDAY",
    label: "Суббота:",
    from: initStartDay,
    to: initEndDay,
    isWork: false,
    carServiceType: "CAR_WASH",
    index: 5
  },
  {
    dayOfWeek: "SUNDAY",
    label: "Воскресенье:",
    from: initStartDay,
    to: initEndDay,
    isWork: false,
    carServiceType: "CAR_WASH",
    index: 6
  }
];

const ScheduleTab = ({ workTimes }) => {

  const combineDays = () => {
    return weekDays.map(weekDay => {
      const dayFromServer = workTimes.filter(serverDay => serverDay.dayOfWeek === weekDay.dayOfWeek)[0];
      if (!dayFromServer) {
        return weekDay;
      }
      return { ...weekDay, ...dayFromServer };
    });
  };

  const timeTemplate = timestamp => {
    const date = new Date(timestamp);
    return moment(date).format("HH:mm");
  };

  const renderDayItem = item => {
    const { from, to, label, isWork } = item;
    const workTimeSTR = isWork ? `${timeTemplate(from)} - ${timeTemplate(to)}` : "Выходной";
    return (
      <ListItem key={item.dayOfWeek}>
        <Left style={{ flex: 1 }}>
          <Text>
            {label}
          </Text>
        </Left>
        <Right
          style={{
            flex: 1,
            justifyContent: "flex-end",
            flexDirection: "row"
          }}
        >
          <Text>{workTimeSTR}</Text>
        </Right>
      </ListItem>
    );
  };

  return combineDays().map(renderDayItem);

};


ScheduleTab.defaultProps = {
  workTimes: []
};


export default ScheduleTab;
