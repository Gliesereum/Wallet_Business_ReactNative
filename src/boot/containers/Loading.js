import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, AsyncStorage } from "react-native";
import { View, Text } from "native-base";

import { asyncRequestTest, delay } from "../../utils";

import appActions from "../../redux/app/actions";
import authActions from "../../redux/auth/actions";
import businessActions from "../../redux/washes/actions";

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
        await Promise.all([
          this.checkUser(),
          this.checkEmail(),
          this.checkCorporations(),
          this.checkToken(),
          this.getBusinessType(),
          this.getBusinessCategory(),
          this.props.navigation.navigate("App")
      ]);
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
      await this.props.$authToken(tokenInfo.accessToken);
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

  checkCorporations = async () => {
    try {
      const url = "corporation/by-user";
      const corporations = await asyncRequestTest(url, "GET", "account", this.token);
      await this.props.$getCorporations(corporations);
    } catch (e) {
      this.props.navigation.navigate("Auth");
    }
  };

  getBusinessType = async () => {
    const url = 'business-category/business-type';
    try {
      const businessType = await asyncRequestTest(url, "GET", "karma", this.token);
      this.props.$getBusinessType(businessType);
    } catch (e) {
    }
  };

  getBusinessCategory = async () => {
    const url = 'business-category';
    try {
      const businessCategory = await asyncRequestTest(url, "GET", "karma", this.token);
      this.props.$getBusinessCategory(businessCategory);
    } catch (e) {
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


export default connect(state => state, ({ ...appActions, ...authActions, ...businessActions }))(Loading);
