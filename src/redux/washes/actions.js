import { asyncRequestAuth } from "../../utils";

import appActions from "../app/actions";

const { $globalSpinnerOn, $globalSpinnerOff } = appActions;

const actions = {

  GET_WASHES: "GET_WASHES",

  GET_SERVICE_PRICE: "GET_SERVICE_PRICE",

  GET_SERVICE_PACKAGES: "GET_SERVICE_PACKAGES",

  ADD_WASH: "ADD_WASH",

  UPDATE_WASH: "UPDATE_WASH",

  ADD_SCHEDULE: "ADD_SCHEDULE",

  UPDATE_SCHEDULE: "UPDATE_SCHEDULE",

  ADD_BOX: "ADD_BOX",

  REMOVE_BOX: "REMOVE_BOX",

  $getWashes: () => async dispatch => {
    const url = "carwash/by-user";
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
    const servicesURL = `price/by-corporation-service/${corporationServiceId}`;
    try {
      const data = await asyncRequestAuth(servicesURL);
      await dispatch({ type: actions.GET_SERVICE_PRICE, payload: data });
    } catch (e) {
      const error = e;
    }
  },

  $getServicePackages: corporationServiceId => async dispatch => {
    const packagesURL = `package/by-corporation-service/${corporationServiceId}`;
    try {
      const data = await asyncRequestAuth(packagesURL);
      await dispatch({ type: actions.GET_SERVICE_PACKAGES, payload: data });
    } catch (e) {
      const error = e;
    }
  },


  $addWash: wash => ({ type: actions.ADD_WASH, payload: wash }),

  $updateWash: wash => ({ type: actions.UPDATE_WASH, payload: wash }),

  $addSchedule: schedule => ({ type: actions.ADD_SCHEDULE, payload: schedule }),

  $updateSchedule: schedule => ({ type: actions.UPDATE_SCHEDULE, payload: schedule }),

  $addBox: (carWashId, box) => ({ type: actions.ADD_BOX, payload: { carWashId, box } }),

  $removeBox: (carWashId, boxId) => ({ type: actions.REMOVE_BOX, payload: { carWashId, boxId } })


};


export default actions;
