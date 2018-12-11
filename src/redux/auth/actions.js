import { AsyncStorage } from "react-native";
import { NavigationActions } from "react-navigation";

const actions = {

    GET_CODE: "GET_CODE",
    SEND_CODE: "SEND_CODE",

    AUTH_USER: "AUTH_USER",
    AUTH_BUSINESS: "AUTH_BUSINESS",
    SIGN_OUT: "SIGN_OUT",


    $authUser: ({ user, tokenInfo }) => async dispatch => {
      AsyncStorage.setItem("token", JSON.stringify(tokenInfo));
      await dispatch({ type: actions.AUTH_USER, payload: user });
    },

    $authBusiness: (business) => async dispatch => {
      await dispatch({ type: actions.AUTH_BUSINESS, payload: business });
    },

    $signOut: (redirect) => async dispatch => {
      await dispatch(NavigationActions.navigate({ routeName: "Loading" }));
      await redirect();
      await dispatch({ type: actions.SIGN_OUT });
    }

  }

;


export default actions;
