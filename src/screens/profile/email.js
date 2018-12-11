import React, { Component } from "react";
import { View, Text, Container, Content, Title, Header, Left, Right, Body, Icon, Button } from "native-base";


class Main extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Электронная почта</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View>
            <Text>
              Электронная почта
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Main;
