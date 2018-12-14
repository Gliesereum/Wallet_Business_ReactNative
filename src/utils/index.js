import { createReducer } from "./createReducer";
import { asyncRequest, asyncRequestTest, withToken } from "./request";

const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms));


export {
  createReducer,
  asyncRequest,
  asyncRequestTest,
  delay,
  withToken
};
