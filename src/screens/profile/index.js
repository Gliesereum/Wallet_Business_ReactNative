import React from "react";
import { connect } from "react-redux";
import {
  Text,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Header,
  Container,
  Title,
  Button,
  Body
} from "native-base";

import { HeaderLayout } from "../../components/Layout";


const subroutes = [
  { route: "MainProfile", text: "Основная Информация" },
  { route: "IndividualProfile", text: "Юридическая Информация" },
  { route: "EmailProfile", text: "Электронная почта" }
];


class Profile extends React.Component {

  render() {
    console.log(this.props.auth);
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button onPress={this.props.navigation.openDrawer} transparent>
              <Icon name="menu"/>
            </Button>
          )}
          body="Профиль"
        />
        <Content>
          <List
            dataArray={subroutes}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{ color: "#999" }}/>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }

}


export default connect(state => state)(Profile);
