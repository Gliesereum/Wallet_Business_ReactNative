import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Container, Content, Icon, Text, View, SwipeRow, Toast } from "native-base";
import { HeaderLayout } from "../../components/Layout";

import { asyncRequestAuth } from "../../utils";

import appActions from "../../redux/app/actions";
import washActions from "../../redux/washes/actions";

const deviceHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: deviceHeight / 1.2,
    padding: 5
  },
  emptyListText: {
    textAlign: "center"
  }
});


class BoxesCarWash extends Component {

  state = {
    boxes: []
  };

  componentDidMount() {
    this._initScreen();
  }

  _initScreen = () => {
    const carWashData = this.props.navigation.getParam("carWashData");
    this.setState(state => ({ ...state, boxes: carWashData.spaces }));
  };

  _addBox = async () => {
    const { $globalSpinnerOn, $globalSpinnerOff, $addBox } = this.props;
    const { boxes } = this.state;
    const carWash = this.props.navigation.getParam("carWashData");
    const url = "working-space";
    const indexNumber = boxes.length ? boxes[boxes.length - 1].indexNumber + 1 : 1;
    const body = { indexNumber, corporationServiceId: carWash.id, carServiceType: "CAR_WASH" };
    try {
      await $globalSpinnerOn();
      const newBox = await asyncRequestAuth(url, "POST", "karma", body);
      this.setState(state => ({ ...state, boxes: [...state.boxes, newBox] }));
      $addBox(carWash.id, newBox);
    } catch (e) {
      await Toast.show({ text: e.message || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
  };

  _removeBox = async boxId => {
    const carWash = this.props.navigation.getParam("carWashData");
    const { $globalSpinnerOn, $globalSpinnerOff, $removeBox } = this.props;
    const { boxes } = this.state;
    const url = `working-space/${boxId}`;
    try {
      await $globalSpinnerOn();
      await asyncRequestAuth(url, "DELETE");
      this.setState(state => ({ ...state, boxes: boxes.filter(item => item.id !== boxId) }));
      $removeBox(carWash.id, boxId);
    } catch (e) {
      const error = e;
      Toast.show({ text: e.message || "Ошибка" });
    } finally {
      $globalSpinnerOff();
    }
  };

  renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          У вас нету рабочих боксов. Добавьте несколько.
        </Text>
      </View>
    );
  };

  renderBoxItem = item => {
    return (
      <SwipeRow
        key={item.id}
        rightOpenValue={-75}
        right={
          <Button danger onPress={() => this._removeBox(item.id)}>
            <Icon active name="trash"/>
          </Button>
        }
        body={
          <View style={{ paddingLeft: 20 }}>
            <Text>{item.indexNumber}</Text>
          </View>
        }
      />
    );
  };

  renderBoxList = () => {
    return this.state.boxes.map(this.renderBoxItem);
  };

  renderScreen = () => {
    const { navigation } = this.props;
    const emptyList = !this.state.boxes.length;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => navigation.navigate("CarWashes")}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Боксы"}
          right={(
            <Button onPress={() => this._addBox()} transparent>
              <Icon name="plus" type={"Feather"}/>
            </Button>
          )}
        />
        <Content>
          {emptyList ? this.renderEmptyList() : this.renderBoxList()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, { ...appActions, ...washActions })(BoxesCarWash);
