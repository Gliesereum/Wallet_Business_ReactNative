import React from "react";
import { Button, Container, Content, Icon, Text, View } from "native-base";


import { HeaderLayout } from "../../components/Layout";


const InfoCarWash = props => {
  const { navigation } = props;
  const data = navigation.getParam('carWash');
  return (
    <Container>
      <HeaderLayout
        left={(
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back"/>
          </Button>
        )}
        body={"Информация"}
      />
      <Content>
        <View><Text>Название: {data.name}</Text></View>
        <View><Text>Количество Боксов: {data.countBox}</Text></View>
        <View><Text>Адрес: {data.address}</Text></View>
        <View><Text>Описание: {data.description}</Text></View>
      </Content>
    </Container>
  );
};


export default InfoCarWash;
