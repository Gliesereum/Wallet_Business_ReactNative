import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Content, Icon, Form, Label, Input, Item, Text, Toast, View } from "native-base";

import { HeaderLayout } from "../../components/Layout";
import { asyncRequestTest } from "../../utils";

import appActions from "../../redux/app/actions";
import washActions from "../../redux/washes/actions";
import { Dimensions } from "react-native";


const deviceHeight = Dimensions.get("window").height;


const fields = [
  { label: "Название", key: "name" },
  { label: "Количество боксов, число", key: "countBox", type: "numeric" },
  { label: "Описание", key: "description" },
  { label: "Адрес", key: "address" },
  { label: "Долгота, -180 - 180", key: "latitude" },
  { label: "Ширина, -180 - 180", key: "longitude", type: "numeric" }
];


class NewCarWash extends Component {

  state = { data: {} };

  componentWillMount() {
  }

  onInput = (key, value) => {
    this.setState(state => ({ ...state, data: { ...state.data, [key]: value } }));
  };

  onSubmit = async () => {
    const url = "carwash";
    const { $addWash } = this.props;
    const { token } = this.props.auth;
    try {
      this.props.$globalSpinnerOn();
      const newWash = await asyncRequestTest(url, "POST", "karma", token, this.state.data);
      await $addWash(newWash);
      await this.props.navigation.goBack();
      Toast.show({ text: "Успешно создана мойка!" });
    } catch (e) {
      Toast.show({ text: e.message || "Ошибка" });
    } finally {
      this.props.$globalSpinnerOff();
    }
  };

  renderItemInput = (item) => {
    const { onInput } = this;
    const value = this.state.data[item.key];
    return (
      <Item floatingLabel key={item.key}>
        <Label style={{ paddingTop: 4 }}>{item.label}</Label>
        <Input
          value={value}
          onChangeText={text => onInput(item.key, text)}
          keyboardType={item.type || "default"}
        />
      </Item>
    );
  };

  renderNotAllowedCreateCarWash = () => {
    return (
      <View style={{paddingTop: deviceHeight / 2.5}}>
        <Text style={{textAlign: 'center'}}>
          Аккаунт не верифицирован. Добавьте личную информацию и электронную почту.
        </Text>
      </View>
    );
  };

  renderForm = () => {
    return (
      <View>
        <Form>
          {fields.map(this.renderItemInput)}
        </Form>
        <Button
          style={{ marginLeft: 5, marginRight: 5, marginTop: 10 }}
          onPress={() => this.onSubmit()}
          full
          block
        ><Text>Создать</Text>
        </Button>
      </View>
    );
  };

  renderScreen = () => {
    const { verifiedStatus } = this.props.auth.user;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Новая мойка"}
        />
        <Content>
          {verifiedStatus === 'VERIFIED' ? this.renderForm() : this.renderNotAllowedCreateCarWash()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...appActions, ...washActions }))(NewCarWash);
