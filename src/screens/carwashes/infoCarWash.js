import React from "react";
import { Button, Container, Content, Icon, Text, View, ActionSheet } from "native-base";


import { HeaderLayout } from "../../components/Layout";


const BUTTONS = [
  { text: "Основная информация", path: 'UpdateCarWash'},
  { text: "Рассписание", path: 'ScheduleCarWash'},
  { text: "Боксы", path: 'BoxesCarWash'},
  { text: "Отмена", path: ''},
];

const CANCEL_INDEX = 3;

const InfoCarWash = (props) => {
  const { navigation } = props;
  const data = navigation.getParam("carWash");
  return (
    <Container>
      <HeaderLayout
        left={(
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back"/>
          </Button>
        )}
        body={"Информация"}
        right={(
          <Button
            transparent
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: "Редактировать"
                },
                buttonIndex => {
                  navigation.navigate(BUTTONS[buttonIndex].path, {carWashData: data, isNew: false});
                }
              )}
          >
            <Text>Ред.</Text>
          </Button>
        )}
      />
      <Content>
        <View><Text>Название: {data.name}</Text></View>
        <View><Text>Количество Боксов: {data.spaces.length}</Text></View>
        <View><Text>Адрес: {data.address}</Text></View>
        <View><Text>Описание: {data.description}</Text></View>
      </Content>
    </Container>
  );
};




export default InfoCarWash;
