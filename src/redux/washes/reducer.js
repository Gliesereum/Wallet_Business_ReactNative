import {createReducer} from "../../utils";

import actions from "./actions";


const initialState = {
  washes: [],
  servicePrices: {},                  // Object with corporationKey (from washes list) and array of service prices as value
  servicePackages: {},                // Object with corporationKey (from washes list) and array of service packages as value
  businessType: [],
  businessCategory: [],
};


const washesReducer = createReducer(initialState, {

  [actions.GET_WASHES]: (state, payload) => {
    return {
      ...state,
      washes: payload
    };
  },

  [actions.GET_SERVICE_PRICE]: (state, payload) => {
    if (payload.length === 0) {
      return state;
    }
    const businessId = payload[0].businessId;
    return {
      ...state,
      servicePrices: {
        ...state.servicePrices,
        [businessId]: payload
      }
    };
  },

  [actions.GET_SERVICE_PACKAGES]: (state, payload) => {
    if (payload.length === 0) {
      return state;
    }
    const businessId = payload[0].businessId;
    return {
      ...state,
      servicePackages: {
        ...state.servicePackages,
        [businessId]: payload
      }
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

  [actions.REMOVE_SERVICE]: (state, payload) => {
    const newServicesList = state.washes.filter(item => item.id !== payload);
    return {
      ...state,
      washes: newServicesList
    };
  },

  [actions.ADD_SCHEDULE]: (state, payload) => {
    const updatedCarWash = state.washes.filter(item => item.id === payload[0].objectId)[0];
    const updatedCarWashIndex = state.washes.map(item => item.id).indexOf(updatedCarWash.id);
    const newCarWash = {...updatedCarWash, workTimes: payload};
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
    const updatedCarWash = state.washes.filter(item => item.id === payload[0].objectId)[0];
    const updatedCarWashIndex = state.washes.map(item => item.id).indexOf(updatedCarWash.id);
    const newCarWash = {...updatedCarWash, workTimes: payload};
    return {
      ...state,
      washes: [
        ...state.washes.slice(0, updatedCarWashIndex),
        newCarWash,
        ...state.washes.slice(updatedCarWashIndex + 1, state.washes.length)
      ]
    };
  },

  [actions.ADD_BOX]: (state, {carWashId, box}) => {
    const updatedCarWash = state.washes.filter(item => item.id === carWashId)[0];
    const updatedIndex = state.washes.map(item => item.id).indexOf(carWashId);
    const newCarWash = {...updatedCarWash, spaces: [...updatedCarWash.spaces, box]};
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

  [actions.REMOVE_BOX]: (state, {carWashId, boxId}) => {
    const updatedCarWash = state.washes.filter(item => item.id === carWashId)[0];
    const updatedIndex = state.washes.map(item => item.id).indexOf(carWashId);
    const newCarWash = {...updatedCarWash, spaces: updatedCarWash.spaces.filter(item => item.id !== boxId)};
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

  [actions.ADD_SERVICE_PRICE]: (state, payload) => {
    const {businessId} = payload;
    const updatedBusinessServicesList = state.servicePrices[businessId];
    if (!updatedBusinessServicesList) {
      return {
        ...state,
        servicePrices: {
          ...state.servicePrices,
          [businessId]: [payload]
        }
      };
    }
    return {
      ...state,
      servicePrices: {
        ...state.servicePrices,
        [businessId]: [
          ...state.servicePrices[businessId],
          payload
        ]
      }
    };

  },

  [actions.UPDATE_SERVICE_PRICE]: (state, payload) => {
    const {businessId, id} = payload;
    const updatedServices = state.servicePrices[businessId];
    const updatedServiceIndex = updatedServices.findIndex(item => item.id === id);
    const newServicesArray = [
      ...updatedServices.slice(0, updatedServiceIndex),
      payload,
      ...updatedServices.slice(updatedServiceIndex + 1)

    ];
    return {
      ...state,
      servicePrices: {
        ...state.servicePrices,
        [businessId]: newServicesArray
      }
    };
  },

  [actions.REMOVE_SERVICE_PRICE]: (state, {servicePriceId, businessId}) => {
    const changedServicePrice = state.servicePrices[businessId];
    if (!changedServicePrice && !changedServicePrice.length) {
      return state;
    }
    return {
      ...state,
      servicePrices: {
        ...state.servicePrices,
        [businessId]: changedServicePrice.filter(item => item.id !== servicePriceId)
      }
    };
  },

  [actions.ADD_PACKAGE_SERVICES]: (state, payload) => {
    const {businessId} = payload;
    const updatedBusiness = state.servicePackages[businessId];
    if (!updatedBusiness) {
      return {
        ...state,
        servicePackages: {
          ...state.servicePackages,
          [businessId]: [payload]
        }
      };
    }
    return {
      ...state,
      servicePackages: {
        ...state.servicePackages,
        [businessId]: [
          ...state.servicePackages[businessId],
          payload
        ]
      }
    };
  },

  [actions.UPDATE_PACKAGE_SERVICES]: (state, payload) => {
    const {corporationServiceId, id} = payload;
    const updatedPackage = state.servicePackages[corporationServiceId];
    const updatedPackageIndex = servicePackages.findIndex(item => item.id === id);
    const newPackagesArray = [
      ...updatedPackage.slice(0, updatedPackageIndex),
      payload,
      ...updatedPackage.slice(updatedPackageIndex + 1)

    ];
    return {
      ...state,
      servicePackages: {
        ...state.servicePackages,
        [corporationServiceId]: newPackagesArray
      }
    };
  },

  [actions.REMOVE_PACKAGE]: (state, {packageId, businessId}) => {
    const changedPackage = state.servicePackages[businessId];
    if (!changedPackage && !changedPackage.length) {
      return state;
    }
    return {
      ...state,
      servicePackages: {
        ...state.servicePackages,
        [businessId]: changedPackage.filter(item => item.id !== packageId)
      }
    };
  },

  [actions.GET_BUSINESS_TYPE]: (state, payload) => {
    return {
      ...state,
      businessType: payload || []
    }
  },

  [actions.GET_BUSINESS_CATEGORY]: (state, payload) => {
    return {
      ...state,
      businessCategory: payload || []
    }
  },



});


export default washesReducer;
