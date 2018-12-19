import { createReducer } from "../../utils";

import actions from "./actions";


const initialState = {
  washes: []
};


const washesReducer = createReducer(initialState, {

  [actions.GET_WASHES]: (state, payload) => {
    return {
      ...state,
      washes: payload
    };
  },

  [actions.ADD_WASH]: (state, payload) => {
    return {
      ...state,
      washes: [...state.washes, payload]
    };
  },

  [actions.UPDATE_WASH]: (state, payload) => {
    const newArray = state.washes.filter(wash=>wash.id !== payload.id);
    return {
      ...state,
      washes: [...newArray, payload]
    };
  },

});


export default washesReducer;
