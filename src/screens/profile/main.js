import React, {Component} from "react";
import {connect} from "react-redux";

import {StyleSheet, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {Container, Content, Icon, Button, Toast} from "native-base";

import { Header } from 'react-navigation';

import {asyncRequestTest} from "../../utils";
import {HeaderLayout} from "../../components/Layout";
import authActions from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";

import {UserProfileForm} from '../../components/Forms';


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  }
});


class Main extends Component {

  fillUserData = obj => {
    // return fields.reduce((acc, field) => {
    //   if (!obj[field.key] || !obj[field.key].length) {
    //     obj[field.key] = field.defaultValue;
    //     return acc;
    //   }
    //   return acc;
    // }, obj);
    return obj;
  };

  updateProfile = async data => {
    const {$updateUser, $globalSpinnerOn, $globalSpinnerOff, navigation} = this.props;
    await $globalSpinnerOn();
    try {
      const url = `user`;
      const {token} = this.props.auth;
      const newUser = await asyncRequestTest(url, "PUT", "account", token, this.fillUserData(data));
      await $updateUser(newUser);
      Toast.show({text: "Успешно обновлён профиль"});
      navigation.goBack();
    } catch (e) {
      const error = e;
      Toast.show({text: 'Заполните все поля!'});
    } finally {
      await $globalSpinnerOff();
    }
  };

  render() {
    const {user} = this.props.auth;
    return (
      <Container>
        <HeaderLayout
          left={(
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back"/>
            </Button>
          )}
          body={"Основна Информация"}
        />
        <Content style={styles.container}>
          <KeyboardAvoidingView
            style = {{ flex: 1 }}
            behavior = {Platform.OS === 'android' ? 'padding' : 'position'}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 300})}
          >
            <ScrollView keyboardShouldPersistTaps={'always'}>
              <UserProfileForm onUpdate={this.updateProfile} user={user}/>
            </ScrollView>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }

}

export default connect(state => state, ({...authActions, ...appActions}))(Main);
