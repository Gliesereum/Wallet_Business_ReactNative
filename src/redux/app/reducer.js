import { createReducer } from '../../utils';

import actions from './actions';


const initialState = {
  ready: false,
  globalSpinner: false
};


const appReducer = createReducer(initialState, {
  [actions.GLOBAL_SPINNER_ON]: (state) => {
    return {
      ...state,
      globalSpinner: true
    };
  },
  [actions.GLOBAL_SPINNER_OFF]: (state) => {
    return {
      ...state,
      globalSpinner: false
    };
  }
});


export default appReducer;
