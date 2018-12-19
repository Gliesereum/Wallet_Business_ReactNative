const actions = {

  GET_WASHES: "GET_WASHES",

  ADD_WASH: "ADD_WASH",

  UPDATE_WASH: "UPDATE_WASH",

  $getWashes: (washes) => ({ type: actions.GET_WASHES, payload: washes }),

  $addWash: wash => ({ type: actions.ADD_WASH, payload: wash }),

  $updateWash: wash => ({ type: actions.UPDATE_WASH, payload: wash })


};


export default actions;
