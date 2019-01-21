// @flow
import React, {Component} from 'react';
import {View, Text} from 'react-native';

const fields = {
  corporationServiceId: {key: 'corporationServiceId', label: 'ID', defaultValue: '', render: false, type: 'text'},
  name: {key: 'corporationServiceId', label: 'ID', defaultValue: '', render: true, type: 'text'},
  discount: {key: 'discount', label: 'Скидка:', defaultValue: 0, render: true, type: 'text'},
  duration: {key: 'duration', label: 'Продолжительность, минуты:', defaultValue: 0, render: true, type: 'number'},
  services: {key: 'services', label: 'ID', defaultValue: '', render: false, type: 'array', render: false},
  servicesIds: {key: 'servicesIds', label: 'Услуги', defaultValue: '', render: true, type: 'array'},
};


class PackageForm extends Component {

  state = {data: {}}

  componentDidMount() {
    this._initForm()
  }

  _initForm = () => {

  }

  render() {
    return (
      <View>
        <Text>Welcome, Developer</Text>
      </View>
    )
  }

}


export default PackageForm;
