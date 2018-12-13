import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";

const actions = {

    GET_CODE: "GET_CODE",
    SEND_CODE: "SEND_CODE",

    LOGIN_USER: "LOGIN_USER",
    AUTH_USER: "AUTH_USER",
    AUTH_BUSINESS: "AUTH_BUSINESS",
    AUTH_EMAIL: "AUTH_EMAIL",
    UPDATE_USER: "UPDATE_USER",
    UPDATE_BUSINESS: "UPDATE_BUSINESS",
    ADD_EMAIL: "ADD_EMAIL",
    SIGN_OUT: "SIGN_OUT",

    $loginUser: tokenInfo => async dispatch => {
      await AsyncStorage.setItem("token", JSON.stringify(tokenInfo));
      await dispatch({ type: actions.LOGIN_USER, payload: tokenInfo.accessToken });
    },

    $authUser: user => async dispatch => {
      await dispatch({ type: actions.AUTH_USER, payload: user });
    },

    $authBusiness: (business) => async dispatch => {
      await dispatch({ type: actions.AUTH_BUSINESS, payload: business });
    },

    $authEmail: (email) => async dispatch => {
      await dispatch({ type: actions.ADD_EMAIL, payload: email });
    },

    $updateUser: payload => async dispatch => {
      await dispatch({ type: actions.UPDATE_USER, payload });
    },

    $updateBusiness: payload => async dispatch => {
      await dispatch({ type: actions.UPDATE_BUSINESS, payload });
    },

    $addEmail: payload => async dispatch => {
      await dispatch({ type: actions.ADD_EMAIL, payload });
    },

    $logOut: () => async dispatch => {
      await dispatch({ type: actions.SIGN_OUT });
    }

  }

;


export default actions;
