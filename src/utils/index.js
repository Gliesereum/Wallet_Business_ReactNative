import { createReducer } from './createReducer';
import { asyncRequest } from './request';

const delay = (ms = 1000) => new Promise(res => setTimeout(res, ms));

export {
  createReducer,
  asyncRequest,
  delay
};
