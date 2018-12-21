// @flow
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";


type Props = {
  time: string, // 'HH:mm';
  onChange: Function
}

class TimePicker extends Component<Props, {}> {

  state = {
    isDateTimePickerVisible: false
  };

  _stringToDate = (str) => {
    return moment(str, "HH:mm").toDate();
  };

  _dateToString = (date) => {
    return moment(date).format("HH:mm");
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const stringTime = this._dateToString(date);
    this.props.onChange(stringTime);
    this._hideDateTimePicker();
  };

  renderTimePicker = () => {
    const value = this._stringToDate(this.props.time);
    const label = this.props.time;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>{label}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          minuteInterval={1}
          date={value}
          mode={'time'}
        />
      </View>
    );
  };

  render() {
    return this.renderTimePicker();
  }

}


export default TimePicker;
