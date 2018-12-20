import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, Container, Content, Icon, View, Text } from "native-base";


import HeaderLayout from "../../components/Layout/Header";


const styles = StyleSheet.create({});

const weekDays = [
  { dayOfWeek: "MONDAY", label: "Понедельник", from: "00:00", to: "00:00", isWork: false },
  { dayOfWeek: "TUESDAY", label: "Вторник", from: "00:00", to: "00:00", isWork: false },
  { dayOfWeek: "WEDNESDAY", label: "Среда", from: "00:00", to: "00:00", isWork: false  },
  { dayOfWeek: "THURSDAY", label: "Четверг", from: "00:00", to: "00:00", isWork: false  },
  { dayOfWeek: "FRIDAY", label: "Пятница", from: "00:00", to: "00:00", isWork: false  },
  { dayOfWeek: "SATURDAY", label: "Суббота", from: "00:00", to: "00:00", isWork: false  },
  { dayOfWeek: "SUNDAY", label: "Воскресенье", from: "00:00", to: "00:00", isWork: false  }
];


class scheduleCarWash extends Component {

  state = {data: weekDays};

  renderDayItem = () => {
    return (
      <View>

      </View>
    );
  };

  renderScreen = () => {
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Рассписание"}
        />
        <Content>
          <Text>Рассписание</Text>
        </Content>
      </Container>
    );
  };

  render() {
    return this.renderScreen();
  }

}


export default scheduleCarWash;
