import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, AsyncStorage } from "react-native";
import { View, Text } from "native-base";

import { asyncRequestTest, delay } from "../../utils";

import appActions from "../../redux/app/actions";
import authActions from "../../redux/auth/actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});


class Loading extends Component {

  componentDidMount() {
    this.initApp();
  };

  initApp = async () => {
    try {
      await this.checkToken();
      if (this.token) {
        await this.props.$authToken(this.token);
        await this.checkUser();
        await this.checkEmail();
        await this.props.navigation.navigate("App");
      }
      else {
        this.props.navigation.navigate("Logout");
      }
    } catch (e) {
      this.props.navigation.navigate("Auth");
    }

  };

  checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const tokenInfo = JSON.parse(token);
    if (!tokenInfo) {
      this.props.navigation.navigate("Logout");
      return;
    }
    try {
      const now = new Date().getTime();
      if (now > tokenInfo.accessExpirationDate) {
        this.props.navigation.navigate("Logout");
      }
      this.token = tokenInfo.accessToken;
    } catch (e) {
      this.props.navigation.navigate("Logout");
    }
  };

  checkUser = async () => {
    try {
      const url = "user/me";
      const user = await asyncRequestTest(url, "GET", "account", this.token);
      this.props.$authUser(user);
    } catch (e) {
      //
    }
  };

  checkEmail = async () => {
    try {
      const url = "email/by-user";
      const email = await asyncRequestTest(url, "GET", "account", this.token);
      await this.props.$authEmail(email);
    } catch (e) {
      this.props.navigation.navigate("Auth");
    }
  };

  _renderLoading = () => {
    return (
      <View style={styles.container}><Text>Loading...</Text></View>
    );
  };

  render() {
    return this._renderLoading();
  }

}


export default connect(state => state, ({ ...appActions, ...authActions }))(Loading);
