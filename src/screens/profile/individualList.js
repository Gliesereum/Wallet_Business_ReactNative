import React from "react";
import { connect } from "react-redux";
import { Text } from "react-native";
import { HeaderLayout } from "../../components/Layout";
import { Button, Container, Content, Icon, Left, List, ListItem, Right } from "native-base";


const IndividualList = props => {
  const {business} = props.user;
  return (
    <Container>
      <HeaderLayout
        left={(
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back"/>
          </Button>
        )}
        body={"Компании"}
      />
      <Content>
        <List
          dataArray={business}
          renderRow={data =>
            <ListItem
              button
              onPress={() => props.navigation.navigate("InfoCarWash", {
                carWash: data
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


export default connect(state => ({ user: state.auth.user }))(IndividualList);
