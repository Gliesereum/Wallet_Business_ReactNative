const actions = {

  GET_WASHES: 'GET_WASHES',

  ADD_WASH: 'ADD_WASH',

  $getWashes: (washes) => ({ type: actions.GET_WASHES, payload: washes }),

  $addWash: wash => ({type:actions.ADD_WASH, payload: wash})

};


export default actions;
