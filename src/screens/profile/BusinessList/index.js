import React from "react";
import { connect } from "react-redux";
import { Text } from "react-native";
import { HeaderLayout } from "../../../components/Layout";
import { Button, Container, Content, Icon, Left, List, ListItem, Right } from "native-base";


const BusinessList = props => {
  const { navigation, corporations } = props;
  return (
    <Container>
      <HeaderLayout
        left={(
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back"/>
          </Button>
        )}
        body={"Компании"}
        right={(
          <Button transparent onPress={() => navigation.navigate("NewBusiness")}>
            <Icon name="plus" type={"Feather"}/>
          </Button>
        )}
      />
      <Content>
        <List
          dataArray={corporations}
          renderRow={data =>
            <ListItem
              button
              onPress={() => props.navigation.navigate("UpdateBusiness", {
                business: data
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
      </Content>
    </Container>
  );
};


export default connect(state => ({ user: state.auth.user, corporations: state.auth.corporations }))(BusinessList);
