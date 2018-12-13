import React, { Component } from "react";
import { Button, Container, Content, Icon, Text } from "native-base";

import { HeaderLayout } from "../../components/Layout";


class CarWashes extends Component {

  renderScreen = () => {
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
          <Text>Мойки ёпта</Text>
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default CarWashes;
