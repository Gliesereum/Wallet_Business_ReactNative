import React, { Component } from "react";
import { Container, Content, Header, Title, Left, Right, Icon, Body, Button, Text } from "native-base";


class DashBoard extends Component {

  renderScreen = () => {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
          <Title>Dashboard</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <Button onPress={this.props.navigation.openDrawer}><Text>Open</Text></Button>
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default DashBoard;
