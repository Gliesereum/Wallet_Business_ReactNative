import { createReducer } from "../../utils";

import actions from "./actions";


const initialState = {
  authenticated: true,
  token: null,
  user: {},
  email: null
};


const appReducer = createReducer(initialState, {

  [actions.LOGIN_USER]: (state, payload) => {
    return {
      ...state,
      authenticated: true,
      token: payload
    };
  },

  [actions.AUTH_TOKEN]: (state, payload) => {
    return {
      ...state,
      token: payload
    };
  },

  [actions.AUTH_USER]: (state, payload) => {
    return {
      ...state,
      user: payload
    };
  },
  [actions.AUTH_BUSINESS]: (state, payload) => {
    return {
      ...state,
      business: payload
    };
  },
  [actions.AUTH_EMAIL]: (state, payload) => {
    return {
      ...state,
      email: payload
    };
  },
  [actions.UPDATE_USER]: (state, payload) => {
    return {
      ...state,
      user: payload
    };
  },
  [actions.UPDATE_BUSINESS]: (state, payload) => {
    return {
      ...state,
      business: payload
    };
  },
  [actions.ADD_EMAIL]: (state, payload) => {
    return {
      ...state,
      email: payload,
      user: {
        ...state.user,
        verifiedStatus: 'VERIFIED'
      }
    };
  },
  [actions.SIGN_OUT]: state => {
    return initialState;
  }
});


export default appReducer;
