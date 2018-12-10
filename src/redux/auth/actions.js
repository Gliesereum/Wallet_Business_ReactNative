const actions = {

    GET_CODE: "GET_CODE",
    SEND_CODE: "SEND_CODE",

    AUTH_USER: "AUTH_USER",


    $authUser: user => async dispatch => {
      await dispatch({ type: actions.AUTH_USER, payload: user });
    }
  }

;


export default actions;
