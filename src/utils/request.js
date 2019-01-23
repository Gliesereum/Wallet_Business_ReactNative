import config from "../config";
import { AsyncStorage } from "react-native";

// import {store} from '../redux/store';

const timeOutMessageError = new Error("Превишен интервал ожидания. Повторите попытку!");

const timeOut = (reject, time = 60000) => (setTimeout(() => reject(timeOutMessageError), time));


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

const requestConfig = (method, token, body) => {
  return {
    method,
    cache: "default",
    headers: header(token),
    body: JSON.stringify(body)
  };
};


export const asyncRequestTest = (url, method = "GET", moduleUrl = "karma", token, body, requestTime) => {
  return new Promise(async (resolve, reject) => {
    const timer = timeOut(reject, requestTime);
    try {
      const fullURL = `${config.url}${moduleUrl}/v1/${url}`;
      const _requestConfig = requestConfig(method, token, body);
      const request = await fetch(fullURL, _requestConfig);
      if (request.status === 204) {
        clearTimeout(timer);
        resolve();
      }
      if (request.status >= 200 && request.status <= 300) {
        const data = await request.json();
        clearTimeout(timer);
        resolve(data);
      }
      const data = await request.json();
      clearTimeout(timer);
      reject(data);
    } catch (e) {
      clearTimeout(timer);
      reject(e);
    }
  });
};

export const asyncRequestAuth = (url, method = "GET", moduleUrl = "karma", body, requestTime) => {
  return new Promise(async (resolve, reject) => {
    const timer = timeOut(reject, requestTime);
    const token = JSON.parse(await AsyncStorage.getItem("token")).accessToken;
    console.log("body epta", body);
    try {
      const fullURL = `${config.url}${moduleUrl}/v1/${url}`;
      const _requestConfig = requestConfig(method, token, body);
      const request = await fetch(fullURL, _requestConfig);
      if (request.status === 204) {
        clearTimeout(timer);
        resolve();
      }
      if (request.status >= 200 && request.status <= 300) {
        const data = await request.json();
        clearTimeout(timer);
        resolve(data);
      }
      const data = await request.json();
      clearTimeout(timer);
      reject(data);
    } catch (e) {
      clearTimeout(timer);
      reject(e);
    }
  });
};


export const withToken = fn => (...argv) => {
  // console.log(store);
  // const token = store.getState().auth.accessToken;
  // return fn({...argv, token});
};


function header(token) {
  const defaultHeaders = { "content-type": "application/json", "accept": "application/json" };
  if (!token) {
    return defaultHeaders;
  }
  return { ...defaultHeaders, "Authorization": `Bearer ${token}` };
};


