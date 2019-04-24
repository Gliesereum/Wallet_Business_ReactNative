// @flow
import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {Button, Form, Input, Item, Label, Text, View} from "native-base";
import {withNavigation} from "react-navigation";

import Field from "./children/Field";
import Toast from "../../theme/components/Toast";


type Props = {
  onSubmit: Function,
  type: "new" | "update",
  carWashData?: Object,
  corporation: Array
};

const currentTimeZone = -new Date().getTimezoneOffset();


const fields = {
  corporationId: {key: "corporationId", label: "Компания:", type: "select", render: true, defaultValue: ""},
  name: {key: "name", label: "Название:", type: "string", render: true, defaultValue: ""},
  phone: {key: "phone", label: "Телефон:", type: "number", render: true, defaultValue: ""},
  description: {key: "description", label: "Описание:", type: "string", render: true, defaultValue: ""},
  address: {key: "address", label: "Адрес", type: "map", render: true, defaultValue: ""},
  latitude: {key: "latitude", label: "Широта", type: "string", render: false, defaultValue: ""},
  longitude: {key: "longitude", label: "Долгота", type: "string", render: false, defaultValue: ""},
  serviceType: {key: "serviceType", label: "Тип сервиса", type: "select", render: true, defaultValue: null},
  timeZone: {key: "timeZone", label: "Тайм Зона", type: "number", render: false, defaultValue: currentTimeZone}
};

const businessTypeTranslate = (businessType) => {
  const translates = {
    CAR_WASH: 'Авто мойки',
    CAR_SERVICE: 'СТО',
    TIRE_FITTING: 'Шиномонтаж'
  };

  if(!translates[businessType]) {
    return `${businessType} (отсутсвует перевод)`
  }

  return translates[businessType];

};

const businessTypeArray = businessType => {
  return businessType.map((businessTypeItem, index) => {
    return {
      label: businessTypeTranslate(businessTypeItem),
      name: businessTypeTranslate(businessTypeItem),
      key: businessTypeItem,
      id: businessTypeItem,
      value: businessTypeItem
    }
  })
};


class CarWashFrom extends Component<Props, {}> {

  initEmptyForm = () => {
    const fieldsList = Object.keys(fields);
    return fieldsList.reduce((form, key) => {
      form[key] = fields[key].defaultValue || "";
      return form;
    }, {});
  };

  state = {data: this.initEmptyForm(), error: {}};

  componentDidMount() {
    this.fillForm();
  }

  fillForm = () => {
    const carWashData = this.props.carWashData;
    this.setState(state => ({
      ...state,
      data: {
        ...state.data,
        ...carWashData
      }
    }));
  };

  onInput = (key, value) => {
    this.setState(state => ({...state, data: {...state.data, [key]: value}}));
  };

  errorHandler = (e) => {
    const {additional} = e;
    const error = e;
    Toast.show({text: "Заполните все поля"});
    this.setState(state => ({...state, error: additional}));
  };

  dataHandler = data => {
    if (!data.corporationId) {
      data['corporationId'] = this.props.corporation[0].id;
    }

    if (!data.serviceType) {
      data['businessType'] = this.props.businessType[0];
    }

    return data
  };

  submitHandler = () => {
    this.props.onSubmit(this.dataHandler(this.state.data)).then().catch(this.errorHandler);
  };

  _locationSubmit = ({location, address}) => {
    this.onInput("latitude", location.latitude);
    this.onInput("longitude", location.longitude);
    this.onInput("address", address);
  };

  _openMapScreen = () => {
    this.props.navigation.navigate("AddressInfo", {
        address: this.state.data.address,
        location: {
          latitude: this.state.data.latitude,
          longitude: this.state.data.longitude
        },
        onSubmit: this._locationSubmit
      }
    );
  };

  optionsHandler = key => {
    return {
      corporationId: this.props.corporation,
      serviceType: businessTypeArray(this.props.businessType)
    }[key]
  };

  renderItemInput = key => {
    const {onInput} = this;
    const field = fields[key];
    const value = this.state.data[field.key];
    const error = this.state.error[field.key];
    const options = this.optionsHandler(field.key);
    const mapField = (
      <Item fixedLabel key={key} error={!!error}>
        <Label style={{paddingTop: 4}}>{field.label}</Label>
        <Input
          value={value.toString()}
          onChangeText={text => onInput(field.key, text)}
          keyboardType={"default"}
          onFocus={this._openMapScreen}
        />
      </Item>
    );
    if (field.type === "map") {
      return mapField;
    }
    return field.render && (
      <Field
        key={key}
        type={field.type}
        label={field.label}
        inputKey={field.key}
        value={value}
        onChange={onInput}
        options={options}
      />
    );
  };

  renderForm = () => {
    const fieldsList = Object.keys(fields);
    const fieldsForm = fieldsList.map(this.renderItemInput);
    const submitButtonTitle = this.props.type === "new" ? "Создать" : "Сохранить";
    return (
      <View>
        <Form>
          {fieldsForm}
        </Form>
        <Button
          style={{marginLeft: 5, marginRight: 5, marginTop: 10}}
          onPress={() => this.submitHandler()}
          full
          block
        >
          <Text>{submitButtonTitle}</Text>
        </Button>
        {/*{this.props.type !== "new" && (*/}
        {/*<Button*/}
        {/*full*/}
        {/*block*/}
        {/*danger*/}
        {/*bordered*/}
        {/*onPress={this.props.onDelete}*/}
        {/*style={{ marginLeft: 5, marginRight: 5, marginTop: 10 }}*/}
        {/*>*/}
        {/*<Text>Удалить</Text>*/}
        {/*</Button>*/}
        {/*)}*/}
      </View>
    );
  };

  render() {
    return this.renderForm();
  }

}


export default withNavigation(CarWashFrom);
