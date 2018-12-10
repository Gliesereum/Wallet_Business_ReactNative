import config from "../config";

const timeOutMessageError = new Error("Time Out!");

const timeOut = (reject, time = 50000) => setTimeout(() => reject(timeOutMessageError), time);

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}


// eslint-disable-next-line
export const asyncRequest = (url, method = "GET", body, headers, time) => {
  return new Promise((resolve, reject) => {
    const timer = timeOut(reject, time);
    fetch(`${config.url}${url}`, {
      method: method,
      cache: "default",
      headers: header(headers),
      body: JSON.stringify(body)
    }).then(checkHttpStatus).then(data => {
      clearInterval(timer);
      resolve(data);
    }).catch(err => {
      reject(err);
    });
  });
};

function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    return response.json().then(Promise.reject.bind(Promise));
  }
}

//TODO Refactor auth headers and cookies

function header(headers) {
  const defaultHeaders = { "content-type": "application/json", "accept": "application/json" };
  const additionalHeaders = { ...headers };
  return false ? { ...defaultHeaders, ...additionalHeaders, ...authHeaders } : { ...defaultHeaders, ...additionalHeaders };
}


