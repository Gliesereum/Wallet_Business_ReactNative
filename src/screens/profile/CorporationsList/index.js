import React from "react";
import {connect} from "react-redux";
import {Alert, Text} from "react-native";
import {HeaderLayout} from "../../../components/Layout";
import {Button, Container, Content, Icon, Left, List, ListItem, Right, Toast} from "native-base";
import {asyncRequestAuth} from "../../../utils";

import {EmptyScreen} from '../../../components';

import appActions from "../../../redux/app/actions";
import authActions from "../../../redux/auth/actions";

const CorporationsList = props => {
  const {navigation, corporations} = props;

  const _deleteCorporationHandler = async corporationId => {
    const url = `corporation/${corporationId}`;
    try {
      await props.$globalSpinnerOn();
      await asyncRequestAuth(url, "DELETE", 'account');
      await props.$removeCorporation(corporationId);
      await Toast.show({text: "Успешно удалено"});
    } catch (e) {
      console.log(e);
      Toast.show({text: "Ошибка"});
    } finally {
      await props.$globalSpinnerOff();
    }
  };

  const _deleteAlertOpenHandler = corporationId => () => {
    Alert.alert(
      "Удалить Компанию?",
      null,
      [
        {text: "Удалить", onPress: () => _deleteCorporationHandler(corporationId)},
        {
          text: "Отмена",
          onPress: () => {
          },
          style: "cancel"
        }
      ],
      {cancelable: false}
    );
  };

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

        {corporations && corporations.length ? (
          <List
            dataArray={corporations}
            renderRow={data =>
              <ListItem
                button
                onLongPress={_deleteAlertOpenHandler(data.id)}
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
                  <Icon name="arrow-forward" style={{color: "#999"}}/>
                </Right>
              </ListItem>}
          />
        ) : (<EmptyScreen message={'Пустой список'}/>)}

      </Content>
    </Container>
  );
};


export default connect(state => ({
  user: state.auth.user,
  corporations: state.auth.corporations
}), ({...appActions, ...authActions}))(CorporationsList);
