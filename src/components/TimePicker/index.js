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

  _stringToDate = date => {
    const userOffset = new Date().getTimezoneOffset() * 60000;
    const labelDate = date + userOffset;
    return new Date(labelDate);
  };

  _strToLabel = date => {
    const userOffset = new Date().getTimezoneOffset() * 60000;
    const labelDate = date + userOffset;
    return moment(labelDate).format("HH:mm");
  };

  _dateToTimeStamp = (date) => {
    const userTimeZone = new Date().getTimezoneOffset() * 60000;
    const dateToServer = new Date(date.getTime() - userTimeZone).getTime();
    return dateToServer;
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const stringTime = this._dateToTimeStamp(date);
    this.props.onChange(stringTime);
    this._hideDateTimePicker();
  };

  renderTimePicker = () => {
    const value = this._stringToDate(this.props.time);
    const label = this._strToLabel(this.props.time);
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
          mode={"time"}
          is24Hour={true}
        />
      </View>
    );
  };

  render() {
    return this.renderTimePicker();
  }

}


export default TimePicker;
