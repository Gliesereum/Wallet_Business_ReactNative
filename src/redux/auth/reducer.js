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

  [actions.ADD_BUSINESS]: (state, payload) => {
    return {
      ...state,
      user: {
        ...state.user,
        corporation: [...state.user.corporation, payload]
      }
    };
  },

  [actions.UPDATE_BUSINESS]: (state, payload) => {
    const indexChangedBusiness = state.user.corporation.findIndex(item => item.id === payload.id);
    const newBusinesses = state.user.corporation.slice();
    newBusinesses[indexChangedBusiness] = payload;
    if (indexChangedBusiness === -1) {
      return state;
    }
    return {
      ...state,
      user: {
        ...state.user,
        corporation: newBusinesses
      }
    };
  },

  [actions.ADD_EMAIL]: (state, payload) => {
    return {
      ...state,
      email: payload,
      user: {
        ...state.user,
        verifiedStatus: "VERIFIED"
      }
    };
  },
  [actions.SIGN_OUT]: state => {
    return initialState;
  }
});


export default appReducer;
