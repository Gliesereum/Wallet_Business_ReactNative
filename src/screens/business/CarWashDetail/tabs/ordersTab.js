import React, { Component } from "react";

import { ScrollView, RefreshControl, Dimensions } from "react-native";
import { View, Text, List, ListItem, Card, Picker } from "native-base";
import { LineChart } from "react-native-chart-kit";
import { ToggleButton } from "react-native-paper";
import { Header } from "react-navigation";

import moment from "moment";

import periods from './periods';

import { EmptyScreen } from "../../../../components";

import { asyncRequestAuth } from "../../../../utils";

const screenHeight = Dimensions.get("window").height;

const listFontSize = 12;

const chartConfig = {
  backgroundColor: "#4baaee",
  backgroundGradientFrom: "#4c8ed1",
  backgroundGradientTo: "#4c8dd2",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
};

const tabMode = [
  { key: "list", value: "list", icon: "format-list-bulleted" },
  { key: "chart", value: "chart", icon: "show-chart" }
];


const statusTranslate = key => {
  const translatesList = {
    CANCELED: "Отменен",
    WAITING: "В ожидании",
    IN_PROGRESS: "В процессе"
  };
  if (!translatesList[key]) {
    return "Отсутсвует перевод";
  }
  return translatesList[key];
};

class OrdersTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      records: [],
      loading: false,
      period: "today",
      mode: "list",                // list, chart
      periodSelectBarHeight: 0
    };
  }

  componentDidMount() {
    this._getOrders();
  };

  find_dimesions = layout => {
    const { height } = layout;
    this.setState({ periodSelectBarHeight: height });
  };

  completedOrders = orders => {
    return orders.filter(item => item.statusProcess === "COMPLETED");
  };

  orderListRecords = orders => {
    const orderedOrders = orders || [];
    return orderedOrders.reduce((acc, order) => {
      const orderTime = moment(order.finish).format("YYYY-MM-DD");
      if (!acc[orderTime]) {
        acc[orderTime] = [order];
        return acc;
      }
      acc[orderTime] = [...acc[orderTime], order];
      return acc;
    }, {});
  };

  _getOrders = async () => {
    const { period } = this.state;
    const { to, from } = periods[period];
    const url = "record/business/params";
    const body = { businessIds: [this.props.id], from, to };
    try {
      await this.setState({ loading: true, records: [] });
      const records = await asyncRequestAuth(url, "POST", "karma", body) || [];
      this.setState({ records: records });
    } catch (e) {
      console.log(e);
    } finally {
      await this.setState({ loading: false });
    }
  };

  calculateRecords = sortedArrays => {
    return Object.keys(sortedArrays).map(key => {
      return sortedArrays[key].reduce((acc, record) => {
        acc += record.price;
        return acc;
      }, 0);
    });
  };

  getRecordsData = () => {
    const { records, period } = this.state;
    const completedRecords = this.completedOrders(records);
    if (completedRecords.length === 0) {
      return {
        labels: [0],
        data: [0]
      };
    }

    if (period === "today") {
      const dataTemplateArray = new Array(24).fill(0).map((i, idx) => idx);
      const dataTemplateObj = dataTemplateArray.reduce((acc, item) => {
        acc[item] = [];
        return acc;
      }, {});
      const data = completedRecords.reduce((acc, record) => {
        const finishHours = new Date(record.finish).getHours() + (new Date().getTimezoneOffset() / 60);
        acc[finishHours].push(record);
        return acc;
      }, dataTemplateObj);

      return {
        labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
        data: this.calculateRecords(data)
      };
    }

    if (period === "thisWeek") {
      const dataTemplateArray = new Array(7).fill(0).map((i, idx) => idx);
      const dataTemplateObj = dataTemplateArray.reduce((acc, item) => {
        acc[item] = [];
        return acc;
      }, {});
      const data = completedRecords.reduce((acc, record) => {
        const finishHours = new Date(record.finish).getDay() - 1;
        acc[finishHours].push(record);
        return acc;
      }, dataTemplateObj);


      return {
        labels: ["ПН.", "ВТ.", "СР.", "ЧТ.", "ПТ.", "СБ.", "ВС."],
        data: this.calculateRecords(data)
      };
    }

    if (period === "thisMonth") {

      const dataTemplateArray = new Array(31).fill(0).map((i, idx) => idx);
      const dataTemplateObj = dataTemplateArray.reduce((acc, item) => {
        acc[item] = [];
        return acc;
      }, {});
      const data = completedRecords.reduce((acc, record) => {
        const finishHours = new Date(record.finish).getDate() - 1;
        acc[finishHours].push(record);
        return acc;
      }, dataTemplateObj);

      return {
        labels: ["01", "03", "06", "09", "12", "15", "18", "21", "24", "27", "30", "31"],
        data: this.calculateRecords(data)
      };
    }

    if (period === "thisYear") {

      const dataTemplateArray = new Array(12).fill(0).map((i, idx) => idx);
      const dataTemplateObj = dataTemplateArray.reduce((acc, item) => {
        acc[item] = [];
        return acc;
      }, {});
      const data = completedRecords.reduce((acc, record) => {
        const finishHours = new Date(record.finish).getMonth();
        acc[finishHours].push(record);
        return acc;
      }, dataTemplateObj);

      return {
        labels: ["Янв", "МАРТ", "МАЙ", "ИЮЛ", "СЕН", "НОЯ"],
        data: this.calculateRecords(data)
      };
    }

    if (period === "wholePeriod") {

      const recordsByYears = completedRecords.reduce((acc, record) => {
        const year = new Date(record.finish).getFullYear();
        if (!acc[year]) {
          acc[year] = [record];
          return acc;
        }
        acc[year].push(record);
        return acc;

      }, {});

      const priceByYears = Object.keys(recordsByYears).map(key => {
        return recordsByYears[key].reduce((acc, record) => {
          acc += record.price;
          return acc;
        }, 0);
      });

      return {
        labels: Object.keys(recordsByYears),
        data: priceByYears
      };
    }

    return {
      labels: [0],
      data: [0]
    };

  };

  changePeriodHandler = async period => {
    await this.setState({ period });
    this._getOrders();
  };

  renderSelectPeriod = () => {
    const { period, mode } = this.state;
    return (
      <View
        onLayout={(event) => {
          this.find_dimesions(event.nativeEvent.layout);
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Picker note mode="dropdown" style={{ flex: 1 }} selectedValue={period}
                onValueChange={this.changePeriodHandler}>
          {Object.keys(periods).map(i => {
            const period = periods[i];
            return <Picker.Item label={period.label} value={i} key={i}/>;
          })}
        </Picker>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {tabMode.map(item => (
            <ToggleButton
              key={item.key}
              icon={item.icon}
              value={item.value}
              status={mode === item.value ? "checked" : "unchecked"}
              onPress={() => this.setState({ mode: item.value })}
            />
          ))}
        </View>
      </View>
    );
  };

  renderOrdersList = order => {
    const renderTime = moment(order.begin).utc(false).format("HH:mm");
    const priceValue = order.statusProcess === "COMPLETED" ? `${order.price} грн.` : statusTranslate(order.statusProcess);
    return (
      <ListItem
        key={order.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 0,
          paddingHorizontal: 12,
          paddingRight: 18
        }}
      >
        <Text style={{ fontSize: listFontSize }}>Время: {renderTime}</Text>
        <Text style={{ fontSize: listFontSize }}>{priceValue}</Text>
      </ListItem>
    );
  };

  renderOrderCategoryList = (categoryDay, day) => {
    const renderDatesList = categoryDay.map(this.renderOrdersList);
    const salary = this.completedOrders(categoryDay).reduce((acc, order) => (acc += order.price), 0);
    return (
      <Card
        key={day}
        style={{
          // margin: 24,
          borderWidth: 0.3,
          borderColor: "#f3f3f3",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4
        }}

      >
        <ListItem
          key={day}
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#f0f0f0",
            marginLeft: 0,
            paddingHorizontal: 12
          }}
        >
          <Text style={{ fontSize: listFontSize }}>Дата: {day}</Text>
          <Text style={{ fontSize: listFontSize }}>Получено: </Text>
        </ListItem>
        {renderDatesList}
        <ListItem
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginLeft: 0,
            paddingHorizontal: 12,
            paddingRight: 18
          }}
        >
          <Text style={{ fontSize: listFontSize }}>Итого за день: {salary}</Text>
        </ListItem>
      </Card>

    );
  };

  renderEmptyList = () => {
    return !this.state.loading && (
      <EmptyScreen message={"Нет заказов"}/>
    );
  };

  renderList = () => {
    const { mode, records } = this.state;
    if (mode === "list") {
      if (records.length === 0) {
        return this.renderEmptyList();
      }
      const orderedListRecords = this.orderListRecords(records);
      return Object
        .keys(orderedListRecords)
        .map((day, idx) => this.renderOrderCategoryList(orderedListRecords[day], day, idx));
    }
    return false;
  };

  renderChart = () => {
    const { records, mode, periodSelectBarHeight } = this.state;
    if (mode === "chart") {
      const height = screenHeight - Header.HEIGHT - periodSelectBarHeight;
      const charData = this.getRecordsData();
      const data = {
        labels: charData.labels,
        datasets: [{
          data: charData.data,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
          strokeWidth: 2 // optional
        }]
      };

      return (
        <LineChart
          data={data}
          width={Dimensions.get("window").width}
          height={height}
          chartConfig={chartConfig}

          bezier

        />
      );

    }
    return false;
  };

  renderTab = () => {
    return (
      <>
        {this.renderSelectPeriod()}
        <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this._getOrders}/>}>
          <List>
            {this.renderList()}
            {this.renderChart()}
          </List>
        </ScrollView>
      </>
    );
  };

  render() {
    return this.renderTab();
  }

}

export default OrdersTab;
