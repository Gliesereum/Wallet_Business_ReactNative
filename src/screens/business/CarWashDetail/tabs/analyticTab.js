import React from "react";

import { Dimensions, RefreshControl, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { List, Picker, View, Text } from "native-base";

import { asyncRequestAuth } from "../../../../utils";


import { PieChart } from "react-native-chart-kit";

import periods from "./periods";

const fontSize = 8;

const filters = {
  services: { key: "services", label: "Топ 5 сервисов" },
  packages: { key: "packages", label: "Топ 5 пакетов" },
  workers: { key: "workers", label: "Топ рабочих" }
};

const randomColor = () => {
  const color = () => Math.ceil(Math.random() * 255);
  return `rgba(${color()}, ${color()}, ${color()})`
};

const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 8
  },
  {
    name: "Toronto",
    population: 2800000,
    color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 8
  },
  {
    name: "Beijing",
    population: 527612,
    color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 8
  },
  {
    name: "New York",
    population: 8538000,
    color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 8
  },
  {
    name: "Moscow",
    population: 11920000,
    color: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`,
    legendFontColor: "#7F7F7F",
    legendFontSize: 8
  }
];

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


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8
  }
});

class AnalyticTab extends React.Component {

  state = {
    loading: false,
    period: "today",
    filter: "packages",
    data: {},
    gottenData: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { from, to } = periods[this.state.period];
    const url = "analytics/by-filter";
    const body = { from, to, businessId: this.props.id, statuses: ["COMPLETED"] };
    try {
      this.setState({ loading: true });
      const data = await asyncRequestAuth(url, "POST", "karma", body) || [];
      this.setState({ data, gottenData: true });
    } catch (e) {

    } finally {
      this.setState({ loading: false });
    }

  };

  handleData = () => {
    const { data, filter, gottenData } = this.state;
    if (gottenData) {
      return Object.keys(data[filter]).reduce((acc, key) => {
        acc.push ({
          income: data[filter][key].reduce((sum, record) => sum += record.price, 0),
          name: key,
          legendFontColor: "rgba(131, 167, 234, 1)",
          color: randomColor(),
          legendFontSize: fontSize
        });
        return acc
      }, [])
    }
    return []
  };

  onSelectPeriod = async period => {
    await this.setState({ period });
    await this.getData();
  };

  onSelectFilter = filter => {
    this.setState({ filter });
  };

  renderSelectPeriod = () => {
    return (
      <Picker note mode="dropdown" style={{ flex: 1 }} selectedValue={this.state.period}
              onValueChange={this.onSelectPeriod}>
        {Object.keys(periods).map(i => {
          const period = periods[i];
          return <Picker.Item label={period.label} value={i} key={i}/>;
        })}
      </Picker>
    );
  };

  renderSelectFilter = () => {
    return (
      <Picker note mode="dropdown" style={{ flex: 1 }} selectedValue={this.state.filter} onValueChange={this.onSelectFilter}>
        {Object.keys(filters).map(i => {
          const filter = filters[i];
          return <Picker.Item label={filter.label} value={i} key={i}/>;
        })}
      </Picker>
    );
  };

  renderChart = () => {
    if (this.state.gottenData) {
      const data = this.handleData();
      console.log(data);
      return (
        <View style={{flex: 1}}>
          <PieChart
            data={{
              name: "Seoul",
              income: 21500000,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 8
            }}
            width={Dimensions.get('screen').width}
            height={220}
            chartConfig={chartConfig}
            accessor="income"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )
    }
    return null
  };

  renderTab = () => {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.getData}/>}>
        <List>
          {this.renderSelectFilter()}
          {this.renderSelectPeriod()}
          {this.renderChart()}
        </List>
      </ScrollView>
    );
  };

  render() {
    return this.renderTab();
  }

}


export default AnalyticTab;
