import { Middleware } from 'redux';

import {
  API_SUCCESS,
  API_ERROR,
  FETCH_USER,
  USER,
  apiRequest,
  setLoader,
  setNotification,
  setUser,
} from '#store/actions';

import { endpoints } from '#store/constant';

const fetchUser: Middleware = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_USER) {
    dispatch(apiRequest(null, 'GET', endpoints.GET_ME, USER));
    dispatch(setLoader(true));
  }
};
const getUser: Middleware = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === `${USER} ${API_SUCCESS}`) {
    dispatch(setUser(action.payload));
    dispatch(setLoader(false));
  }
};

const userError: Middleware = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === `${USER} ${API_ERROR}`) {
    dispatch(setNotification(action.payload.data.toString(), USER));
    dispatch(setLoader(false));
  }
};

export default [
  fetchUser,
  getUser,
  userError,
];
