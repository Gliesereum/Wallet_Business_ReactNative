import React, { Component } from "react";
import { View, Button, Text } from "native-base";
import { StyleSheet } from "react-native";

import PriceInput from "../children/Input";


const styles = StyleSheet.create({
  container: {
    padding: 6
  }
});

const renderFields = {
  businessId: { label: "Бизнес:", type: "string", defaultValue: "", render: false },
  serviceId: { label: "Вид Услуги:", type: "select", defaultValue: "", render: true },
  name: { label: "Название:", key: "name", type: "string", defaultValue: "", render: true },
  description: { label: "Описание:", type: "string", defaultValue: "", render: true },
  price: { label: "Цена, ГРН:", type: "number", defaultValue: "", render: true },
  duration: { label: "Продолжительность, минуты:", type: "number", defaultValue: "", render: true },
  serviceClass: { label: "Класс обслуживания:", type: "string", defaultValue: [], render: false }
};


class MainInfo extends Component {

  renderItemInput = key => {
    const { data, options, errors, onInput } = this.props;
    const field = renderFields[key];
    return field.render && (
      <PriceInput
        type={field.type}
        label={field.label}
        inputKey={key}
        onChange={onInput}
        value={data[key]}
        options={options[key]}
        error={errors[key]}
        key={key}
      />
    );
  };

  renderTab = () => {
    const keys = Object.keys(renderFields);
    const isNew = !this.props.data.id;
    return (
      <View style={styles.container}>
        {keys.map(this.renderItemInput)}
        <Button
          style={{ width: "100%", marginTop: 8, justifyContent: "center" }}
          onPress={this.props.onSubmit}
        >
          <Text>{isNew ? "Далее" : "Сохранить основную информацию"}</Text>
        </Button>
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderTab()}
      </View>
    );
  }

}


export default MainInfo;
