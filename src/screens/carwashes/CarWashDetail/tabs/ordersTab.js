import React, {Component, Fragment} from 'react';

import {View, Text, List, ListItem, Card, Picker} from 'native-base';
import {ScrollView, RefreshControl} from 'react-native';

import moment from 'moment';

import {EmptyScreen} from '../../../../components';

import {asyncRequestAuth} from '../../../../utils';

const todayStartPeriod = new Date().setHours(0, 0, 0, 0);
const todayEndPeriod = new Date().setHours(23, 59, 59, 0);


const startOfWeek = +moment().startOf('week');
const startOfMonth = +moment().startOf('month');

const periods = {
  today: {label: 'Текущий день', from: todayStartPeriod, to: todayEndPeriod},
  thisWeek: {label: 'Текущая неделя', from: startOfWeek, to: todayEndPeriod},
  thisMonth: {label: 'Текущий месяц', from: startOfMonth, to: todayEndPeriod},
  wholePeriod: {label: 'Весь период', from: 0, to: 1745411340867}
};


const listFontSize = 12;

const statusTranslate = key => {
  const translatesList = {
    CANCELED: 'Отменен',
    WAITING: 'В ожидании',
    IN_PROGRESS: 'В процессе',
  };
  if (!translatesList[key]) {
    return 'Отсутсвует перевод';
  }
  return translatesList[key];
};

class OrdersTab extends Component {

  state = {
    records: {},
    loading: false,
    period: 'today'
  };

  componentDidMount() {
    this._getOrders();
  }

  orderOrders = orders => {
    const orderedOrders = orders || [];
    return orderedOrders.reduce((acc, order) => {
      const orderTime = moment(order.finish).format('YYYY-MM-DD');
      if (!acc[orderTime]) {
        acc[orderTime] = [order];
        return acc;
      }
      acc[orderTime] = [...acc[orderTime], order];
      return acc;
    }, {});

  };

  _getOrders = async () => {
    const {period} = this.state;
    const {to, from} = periods[period];
    const url = 'record/business/params';
    const body = {businessIds: [this.props.id], from, to};
    try {
      await this.setState({loading: true});
      const records = await asyncRequestAuth(url, 'POST', 'karma', body);
      this.setState({records: this.orderOrders(records)});
    } catch (e) {
      console.log(e);
    } finally {
      await this.setState({loading: false});
    }
  };

  changePeriodHandler = async period => {
    await this.setState({period})
    this._getOrders()
  };

  renderSelectPeriod = () => {

    const {period} = this.state;
    const selectedPeriod = periods[period];

    return (
      <Picker
        note
        mode="dropdown"
        style={{width: '100%'}}
        selectedValue={period}
        onValueChange={this.changePeriodHandler}
      >
        {Object.keys(periods).map(i => {
          const period = periods[i];
          return <Picker.Item label={period.label} value={i} key={i}/>
        })}

      </Picker>
    );
  };

  renderOrdersList = order => {
    const renderTime = moment(order.begin).utc(false).format('HH:mm');
    const priceValue = order.statusProcess === 'COMPLETED' ? `${order.price} грн.` : statusTranslate(order.statusProcess);
    return (
      <ListItem
        key={order.id}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: 0,
          paddingHorizontal: 12,
          paddingRight: 18,
        }}
      >
        <Text style={{fontSize: listFontSize}}>Время: {renderTime}</Text>
        <Text style={{fontSize: listFontSize}}>{priceValue}</Text>
      </ListItem>
    );
  };

  renderOrderCategoryList = categoryDay => {
    const renderDatesList = this.state.records[categoryDay].map(this.renderOrdersList);
    const salary = this.state.records[categoryDay].filter(item => item.statusProcess === 'COMPLETED').reduce((acc, order) => (acc += order.price), 0);
    return (
      <Card
        key={categoryDay}
        style={{
          // margin: 24,
          borderWidth: 0.3,
          borderColor: '#f3f3f3',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}

      >
        <ListItem
          key={categoryDay}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#f0f0f0',
            marginLeft: 0,
            paddingHorizontal: 12,
          }}
        >
          <Text style={{fontSize: listFontSize}}>Дата: {categoryDay}</Text>
          <Text style={{fontSize: listFontSize}}>Получено: </Text>
        </ListItem>
        {renderDatesList}
        <ListItem
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginLeft: 0,
            paddingHorizontal: 12,
            paddingRight: 18,
          }}
        >
          <Text style={{fontSize: listFontSize}}>Итого за день: {salary}</Text>
        </ListItem>
      </Card>

    );
  };

  renderEmptyList = () => {
    return !this.state.loading && (
      <EmptyScreen message={'Нет заказов'}/>
    );
  };

  renderTab = () => {
    const renderOrdersCategory = Object.keys(this.state.records).map(this.renderOrderCategoryList);
    const emptyList = !!Object.keys(this.state.records).length;
    return (
      <>
        {this.renderSelectPeriod()}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.loading} onRefresh={this._getOrders}
            />
          }
        >
          <List>
            {!emptyList ? this.renderEmptyList() : renderOrdersCategory}
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
