import { createReducer } from "./createReducer";
import { asyncRequest, asyncRequestTest } from "./request";

const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms));

const withToken = func => {
  const token = "Welcome, Developer!";
  func({token});
};

export {
  createReducer,
  asyncRequest,
  asyncRequestTest,
  delay,
  withToken
};
