const actions = {

  GET_WASHES: "GET_WASHES",

  ADD_WASH: "ADD_WASH",

  UPDATE_WASH: "UPDATE_WASH",

  ADD_SCHEDULE: 'ADD_SCHEDULE',

  UPDATE_SCHEDULE: "UPDATE_SCHEDULE",

  $getWashes: (washes) => ({ type: actions.GET_WASHES, payload: washes }),

  $addWash: wash => ({ type: actions.ADD_WASH, payload: wash }),

  $updateWash: wash => ({ type: actions.UPDATE_WASH, payload: wash }),

  $addSchedule: schedule => ({type: actions.ADD_SCHEDULE, payload: schedule}),

  $updateSchedule: schedule => ({ type: actions.UPDATE_SCHEDULE, payload: schedule })


};


export default actions;
