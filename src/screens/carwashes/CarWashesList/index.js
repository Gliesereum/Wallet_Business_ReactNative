import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Container, Content, Icon, Left, List, ListItem, Right, Text, View } from "native-base";

import washActions from "../../../redux/washes/actions";
import appActions from "../../../redux/app/actions";


const deviceHeight = Dimensions.get("window").height;


import { HeaderLayout } from "../../../components/Layout";

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: deviceHeight / 1.2
  }
});


class CarWashes extends Component {

  componentWillMount() {
    this.initScreen();
  }

  initScreen = async () => {
    const { $getPriceService, $getServicePackages } = this.props;
    await this.props.$getWashes();
    const { washes } = this.props.washes;
    Promise.all(washes.map(item => $getPriceService(item.id)));
    Promise.all(washes.map(item => $getServicePackages(item.id)));
  };

  renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}><Text>Пустой список</Text></View>
    );
  };

  renderWashesList = () => {
    const { washes } = this.props.washes;
    return (
      <List
        dataArray={washes}
        renderRow={data =>

          <ListItem
            button
            onPress={() => this.props.navigation.navigate("InfoCarWash", {
              carWash: data,
              carWashID: data.id
            })}
          >
            <Left>
              <Text>
                {data.name}
              </Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" style={{ color: "#999" }}/>
            </Right>
          </ListItem>}
      />
    );
  };

  renderScreen = () => {
    const { washes } = this.props.washes;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button onPress={this.props.navigation.openDrawer} transparent>
              <Icon name="menu"/>
            </Button>
          )}
          body={"Мойки"}
          right={(
            <Button onPress={() => this.props.navigation.navigate("NewCarWash")} transparent>
              <Icon name="plus" type={"Feather"}/>
            </Button>
          )}
        />
        <Content>
          {washes.length ? this.renderWashesList() : this.renderEmptyList()}
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default connect(state => state, ({ ...washActions, ...appActions }))(CarWashes);
