import React from "react";
import { Text, Content, List, ListItem, Left, Right, Icon, Header, Container, Title, Button, Body } from "native-base";


const subroutes = [
  { route: "MainProfile", text: "Основная Информация" },
  { route: "IndividualProfile", text: "Юридическая Информация" },
  { route: "EmailProfile", text: "Электронная почта" }
];


const Profile = props => {
  return (
    <Container>
      <Header>
        <Left>
          <Button onPress={props.navigation.openDrawer} transparent>
            <Icon name="menu"/>
          </Button>
        </Left>
        <Body> <Title>Профиль</Title></Body>
        <Right/>
      </Header>
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

export default Profile;
