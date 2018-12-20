import { createReducer } from "./createReducer";
import { asyncRequest, asyncRequestTest, withToken, asyncRequestAuth } from "./request";

const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms));


export {
  createReducer,
  asyncRequest,
  asyncRequestTest,
  asyncRequestAuth,
  delay,
  withToken
};
