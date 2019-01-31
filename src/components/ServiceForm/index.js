// @flow
import React, { Component } from "react";
import { View, Toast, Tabs, Tab, Container, Button, Icon, Content, Text } from "native-base";
import { withNavigation } from "react-navigation";

import { asyncRequestAuth } from "../../utils";

import { MainInfo, AttributesInfo, ClassInfo } from "./Tabs";
import { HeaderLayout } from "../Layout";


type Props = {
  onSubmit: Function,
  onFullSubmit: Function,
  servicePrice?: Object,
  business: Object,
  isNew?: Boolean
};

type Price = {
  name: String,
  description: String,
  price: Number,
  serviceId: String,            // UUID
  corporationServiceId: String,    // UUID
  duration: Number,             // Minutes
  serviceClass: Array<String>,  // UUID
  interiorTypes: Array<String>, //
  carBodies: Array<String>      //
};

const renderFields = {
  businessId: { label: "Бизнес:", type: "string", defaultValue: "", render: false },
  serviceId: { label: "Вид Услуги:", type: "select", defaultValue: "", render: true },
  name: { label: "Название:", key: "name", type: "string", defaultValue: "", render: true },
  // description: { label: "Описание:", type: "string", defaultValue: "", render: true },
  price: { label: "Цена, ГРН:", type: "number", defaultValue: "", render: true },
  duration: { label: "Продолжительность, минуты:", type: "number", defaultValue: "", render: true },
  serviceClass: { label: "Класс обслуживания:", type: "string", defaultValue: [], render: false },
  attributes: { label: "Фильтра:", type: "array", defaultValue: [], render: false }

};


class ServicePriceForm extends Component<Props, {}> {

  state = {
    data: {},
    options: {
      serviceId: [],
      serviceClass: []
    },
    errors: {},
    filters: []
  };

  componentDidMount() {
    this._initForm();
    this._loadServices();
    this._loadClasses();
    this._loadFilters();
  }

  _initForm = () => {
    const { isNew, servicePrice, business } = this.props;
    this.setState((state) => ({
      data: {
        ...this.state.data,
        businessId: business.id
      },
      options: { ...this.state.options }
    }));
    if (isNew) {
      this.setState(({ data }) => ({ data: { ...this.objToStateObj(renderFields), ...data } }));
      return;
    }
    this.setState(({ data }) => ({ data: { ...this.objToStateObj(renderFields), ...servicePrice } }));
  };

  _loadServices = async () => {
    const url = "service";
    try {
      const servicesOptions = await asyncRequestAuth(url) || [];
      this.setState(({ options }) => ({
        options: {
          ...this.state.options,
          serviceId: servicesOptions
        }
      }));
    } catch (e) {

    }
  };

  _loadClasses = async () => {
    const url = "class";
    try {
      const classOptions = await asyncRequestAuth(url) || [];
      this.setState(({ options }) => ({
        options: {
          ...this.state.options,
          serviceClass: classOptions
        }
      }));
    } catch (e) {

    }
  };

  _loadFilters = async () => {
    const url = `filter/by-service-type?serviceType=${this.props.business.serviceType}`;
    try {
      const filtersForm = await asyncRequestAuth(url);
      this.setState(({ filters }) => ({ filters: filtersForm || [] }));
    } catch (e) {
      const error = e;
      //
    }
  };

  _createServicePrice = async () => {
    const url = "price";
    try {
      const newServicePrice = await asyncRequestAuth(url, "POST", "karma", this.state.data);
      await this.setState(({ data }) => ({ data: newServicePrice }));
      this.tabs.goToPage(1);
      Toast.show({ text: "Успешно добавлена услуга. Добавьте фильтра и класс облуживания." });
    } catch (e) {
      Toast.show({ text: "Заполните все поля" });
    } finally {

    }
  };

  _updateServicePrice = async () => {
    const url = "price";
    try {
      const newServicePrice = await asyncRequestAuth(url, "PUT", "karma", this.state.data);
      await this.setState(({ data }) => ({ data: newServicePrice }));
      Toast.show({ text: "Успешно обвновлена услуга." });
    } catch (e) {
      Toast.show({ text: "Заполните все поля" });
    } finally {

    }
  };

  _pushClassToPriceHandler = async priceClass => {
    const url = "price/class";
    const body = { priceId: this.state.data.id, serviceClassId: priceClass.id };
    try {
      const newPriceClass = await asyncRequestAuth(url, "POST", "karma", body);
      await this.setState(({ data }) => ({
        data: { ...data, serviceClass: [...data.serviceClass, priceClass] }
      }));
      await Toast.show({ text: "Успешно обновлено" });
    } catch (e) {
      const error = e;
      await Toast.show({ text: "Ошибка" });
    }
  };

  _removeClassFromPriceHandler = async priceClass => {
    const { id: servicePriceId } = this.state.data;
    const url = `price/class/${servicePriceId}/${priceClass.id}`;
    await this.setState(({ data }) => ({
      data: {
        ...data,
        serviceClass: data.serviceClass.filter(item => item.id !== priceClass.id)
      }
    }));
    await Toast.show({ text: "Успешно обновлено" });
    try {
      await asyncRequestAuth(url, "DELETE");
    } catch (e) {
      const error = e;
      debugger;
      await Toast.show({ text: "Ошибка" });
    }
  };

  _pushFilterToPriceHandler = async filter => {
    const { id, attributes } = this.state.data;
    const url = `price/filter-attribute/${id}/${filter.id}`;
    const newFilters = [...attributes, filter];
    try {
      const newServicePrice = await asyncRequestAuth(url, "POST");
      await Toast.show({ text: "Успешно обновлено" });
      await this.setState(({ data }) => ({ data: { ...data, attributes: newFilters } }));
    } catch (e) {
      const error = e;
      await Toast.show({ text: "Ошибка" });
    }
  };

  _removeFilterFromPriceHandler = async filter => {
    const { id, attributes } = this.state.data;
    const url = `price/remove/filter-attribute/${id}/${filter.id}`;
    const newAttritubes = attributes.filter(item => item.id !== filter.id);
    try {
      await asyncRequestAuth(url, "DELETE");
      this.setState(({ data }) => ({ data: { ...data, attributes: newAttritubes } }));
      await Toast.show({ text: "Успешно обновлено" });
    } catch (e) {
      const error = e;
      await Toast.show({ text: "Ошибка" });
      //
    }
  };

  objToStateObj = obj => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = obj[key].defaultValue || "";
      return acc;
    }, {});
  };

  _onInput = (key, value) => {
    this.setState(({ data }) => ({ data: { ...data, [key]: value } }));
  };

  _fullSubmitHandler = () => {
    this.props.navigation.goBack();
    this.props.onFullSubmit(this.state.data);
    Toast.show({ text: "Успешно обновлено" });
  };

  renderTabs = () => {
    const { data, options, errors, filters } = this.state;
    const isNew = !data.id;
    const saveMainInfoHandler = isNew ? this._createServicePrice : this._updateServicePrice;
    return (
      <View>
        <Tabs ref={tab => this.tabs = tab}>
          <Tab heading="Основная Информация">
            <MainInfo
              data={data}
              options={options}
              errors={errors}
              onInput={this._onInput}
              onSubmit={saveMainInfoHandler}
            />
          </Tab>

          {!isNew && [
            <Tab heading="Дополнительно" key="additional">
              <AttributesInfo
                filters={filters}
                service={this.state.data}
                onAddFilter={this._pushFilterToPriceHandler}
                onRemoveFilter={this._removeFilterFromPriceHandler}
              />
            </Tab>,
            <Tab heading="Класс обслуживания" key="classes">
              <ClassInfo
                onAddClassToPrice={this._pushClassToPriceHandler}
                onRemoveClassFromPrice={this._removeClassFromPriceHandler}
                serviceClass={options.serviceClass}
                servicePrice={data}
              />
            </Tab>
          ]}
        </Tabs>
      </View>
    );
  };

  renderForm = () => {
    const { data } = this.state;
    const isNew = !data.id;
    const { navigation } = this.props;
    return (
      <Container>
        <HeaderLayout
          left={isNew && (
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={isNew ? "Обновить Услугу" : "Создать Услугу"}
          right={!isNew && (
            <Button transparent onPress={this._fullSubmitHandler}>
              <Text>Сохранить</Text>
            </Button>
          )}
        />
        <Content>
          {this.renderTabs()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderForm();
  }

}


export default withNavigation(ServicePriceForm);
