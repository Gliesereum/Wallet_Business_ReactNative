import { asyncRequestAuth } from "../../utils";

import appActions from "../app/actions";

const { $globalSpinnerOn, $globalSpinnerOff } = appActions;

const actions = {

  GET_WASHES: "GET_WASHES",

  GET_SERVICE_PRICE: "GET_SERVICE_PRICE",

  GET_SERVICE_PACKAGES: "GET_SERVICE_PACKAGES",

  GET_RECORD: "GET_RECORD",

  ADD_WASH: "ADD_WASH",

  UPDATE_WASH: "UPDATE_WASH",

  REMOVE_SERVICE: "REMOVE_SERVICE",

  ADD_SCHEDULE: "ADD_SCHEDULE",

  UPDATE_SCHEDULE: "UPDATE_SCHEDULE",

  ADD_BOX: "ADD_BOX",

  REMOVE_BOX: "REMOVE_BOX",

  ADD_SERVICE_PRICE: "ADD_SERVICE_PRICE",

  UPDATE_SERVICE_PRICE: "UPDATE_SERVICE_PRICE",

  REMOVE_SERVICE_PRICE: "REMOVE_SERVICE_PRICE",

  ADD_PACKAGE_SERVICES: "ADD_PACKAGE_SERVICES",

  UPDATE_PACKAGE_SERVICES: "UPDATE_PACKAGE_SERVICES",

  REMOVE_PACKAGE: "REMOVE_PACKAGE",

  GET_BUSINESS_TYPE: 'GET_BUSINESS_TYPE',

  $getWashes: () => async dispatch => {
    const url = "business/by-user";
    await dispatch($globalSpinnerOn());
    try {
      const data = await asyncRequestAuth(url) || [];
      await dispatch({ type: actions.GET_WASHES, payload: data });
    } catch (e) {
    } finally {
      await dispatch($globalSpinnerOff());
    }
  },

  $getPriceService: corporationServiceId => async dispatch => {
    const servicesURL = `price/by-business/${corporationServiceId}`;
    try {
      const data = await asyncRequestAuth(servicesURL);
      await dispatch({ type: actions.GET_SERVICE_PRICE, payload: data });
    } catch (e) {
      const error = e;
    }
  },

  $getServicePackages: corporationServiceId => async dispatch => {
    const packagesURL = `package/by-business/${corporationServiceId}`;
    try {
      const data = await asyncRequestAuth(packagesURL);
      await dispatch({ type: actions.GET_SERVICE_PACKAGES, payload: data });
    } catch (e) {
      const error = e;
    }
  },

  $getRecord: businessIds => async dispatch => {
    const URL = `record/corporation/params`;
    const body = { businessIds: businessIds, type: "CAR_WASH" };
    try {
      const data = await asyncRequestAuth(URL, "POST", "karma", body);
      await dispatch({ type: actions.GET_RECORD, payload: data });
    } catch (e) {
      const error = e;
    }
  },

  $addWash: wash => ({ type: actions.ADD_WASH, payload: wash }),

  $updateWash: wash => ({ type: actions.UPDATE_WASH, payload: wash }),

  $removeBusiness: serviceId => ({ type: actions.REMOVE_SERVICE, payload: serviceId }),

  $addSchedule: schedule => ({ type: actions.ADD_SCHEDULE, payload: schedule }),

  $updateSchedule: schedule => ({ type: actions.UPDATE_SCHEDULE, payload: schedule }),

  $addBox: (carWashId, box) => ({ type: actions.ADD_BOX, payload: { carWashId, box } }),

  $removeBox: (carWashId, boxId) => ({ type: actions.REMOVE_BOX, payload: { carWashId, boxId } }),

  $addServicePrice: servicePrice => ({ type: actions.ADD_SERVICE_PRICE, payload: servicePrice }),

  $updateServicePrice: servicePrice => ({ type: actions.UPDATE_SERVICE_PRICE, payload: servicePrice }),

  $removeServicePrice: payload => ({ type: actions.REMOVE_SERVICE_PRICE, payload }),

  $addPackageService: packageServices => ({ type: actions.ADD_PACKAGE_SERVICES, payload: packageServices }),

  $updatePackageService: packageServices => ({ type: actions.UPDATE_SERVICE_PRICE, payload: packageServices }),

  $removePackage: payload => ({ type: actions.REMOVE_PACKAGE, payload }),

  $getBusinessType: payload => ({type: actions.GET_BUSINESS_TYPE, payload})

};


export default actions;
