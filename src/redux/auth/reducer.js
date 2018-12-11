import { createReducer } from '../../utils';

import actions from './actions';


const initialState = {
  authenticated: true,
  "user": {
    "id": "b7482219-7298-4f7d-b2b5-c790d5dcff7a",
    "firstName": null,
    "lastName": null,
    "middleName": null,
    "position": null,
    "country": null,
    "city": null,
    "address": null,
    "addAddress": null,
    "avatarUrl": null,
    "coverUrl": null,
    "gender": null,
    "banStatus": "UNBAN",
    "verifiedStatus": "UNVERIFIED",
    "userType": "BUSINESS"
  },
  "business": {
    "id": "9737d2fe-ac1f-49aa-8ca6-26421358f587",
    "name": null,
    "userId": "b7482219-7298-4f7d-b2b5-c790d5dcff7a",
    "description": null,
    "edrpou": null,
    "address": null,
    "logoUrl": null,
    "coverUrl": null,
    "kycstatus": "KFC_NOT_PASSED"
  }
};


const appReducer = createReducer(initialState, {
  [actions.AUTH_USER]: (state, payload) => {
    return {
      ...state,
      authenticated: true,
      user: payload
    };
  },
  [actions.AUTH_BUSINESS]: (state, payload) => {
    return {
      ...state,
      business: payload
    };
  },
  [actions.SIGN_OUT]: state => {
    return {
      ...state,
      authenticated: false,
      user: null,
      business: null
    };
  }
});


export default appReducer;
