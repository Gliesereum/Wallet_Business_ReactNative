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
    const newArray = state.washes.filter(wash => wash.id !== payload.id);
    return {
      ...state,
      washes: [...newArray, payload]
    };
  },

  [actions.ADD_SCHEDULE]: (state, payload) => {
    const updatedCarWash = state.washes.filter(item => item.id === payload[0].businessServiceId)[0];
    const updatedCarWashIndex = state.washes.map(item => item.id).indexOf(updatedCarWash.id);
    const newCarWash = { ...updatedCarWash, workTimes: payload };
    return {
      ...state,
      washes: [
        ...state.washes.slice(0, updatedCarWashIndex),
        newCarWash,
        ...state.washes.slice(updatedCarWashIndex + 1, state.washes.length)
      ]
    };
  },

  [actions.UPDATE_SCHEDULE]: (state, payload) => {
    const updatedCarWash = state.washes.filter(item => item.id === payload[0].businessServiceId)[0];
    const updatedCarWashIndex = state.washes.map(item => item.id).indexOf(updatedCarWash.id);
    const newCarWash = { ...updatedCarWash, workTimes: payload };
    return {
      ...state,
      washes: [
        ...state.washes.slice(0, updatedCarWashIndex),
        newCarWash,
        ...state.washes.slice(updatedCarWashIndex + 1, state.washes.length)
      ]
    };
  },

  [actions.ADD_BOX]: (state, { carWashId, box }) => {
    const updatedCarWash = state.washes.filter(item => item.id === carWashId)[0];
    const updatedIndex = state.washes.map(item => item.id).indexOf(carWashId);
    const newCarWash = { ...updatedCarWash, spaces: [...updatedCarWash.spaces, box] };
    const newCarWashesList = [
      ...state.washes.slice(0, updatedIndex),
      newCarWash,
      ...state.washes.slice(updatedIndex + 1, state.washes.length)
    ];
    return {
      ...state,
      washes: newCarWashesList
    };
  },

  [actions.REMOVE_BOX]: (state, { carWashId, boxId }) => {
    const updatedCarWash = state.washes.filter(item => item.id === carWashId)[0];
    const updatedIndex = state.washes.map(item => item.id).indexOf(carWashId);
    const newCarWash = { ...updatedCarWash, spaces: updatedCarWash.spaces.filter(item => item.id !== boxId) };
    const newCarWashesList = [
      ...state.washes.slice(0, updatedIndex),
      newCarWash,
      ...state.washes.slice(updatedIndex + 1, state.washes.length)
    ];
    return {
      ...state,
      washes: newCarWashesList
    };
  }


});


export default washesReducer;
