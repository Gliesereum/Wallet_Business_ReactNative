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
  Container,
  Button
} from "native-base";

import { HeaderLayout } from "../../components/Layout";


const subroutes = [
  { route: "MainProfile", text: "Основная Информация" },
  { route: "BusinessList", text: "Компании" },
  { route: "EmailProfile", text: "Электронная почта" }
];


const Profile = props => {
  return (
    <Container>
      <HeaderLayout
        left={(
          <Button onPress={props.navigation.openDrawer} transparent>
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
              onPress={() => props.navigation.navigate(data.route)}
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
};


export default connect(state => state)(Profile);
