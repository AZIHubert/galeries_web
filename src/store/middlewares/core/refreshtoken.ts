import moment from 'moment';
import { Middleware } from 'redux';

import {
  AUTH_TOKEN,
  EXPIRES_DATE_TOKEN,
  REFRESH_TOKEN,
} from '#store/constant';

import {
  apiRequest,
  setLoader,
  API_SUCCESS,
  API_ERROR,
} from '#store/actions';

const fetchToken: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const token = localStorage.getItem(AUTH_TOKEN);
  const expiresIn = localStorage.getItem(EXPIRES_DATE_TOKEN);
  if (token && expiresIn) {
    const expiresAt = JSON.parse(expiresIn);
    const isExpired = moment().isAfter(moment(expiresAt));
    if (isExpired) {
      dispatch(setLoader(true));
      dispatch(apiRequest(null, 'GET', REFRESH_TOKEN, '[REFRESH TOKEN]'));
    }
  }
};

const setToken: Middleware = () => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${REFRESH_TOKEN} ${API_SUCCESS}`) {
    localStorage.setItem(AUTH_TOKEN, action.payload.data.token);
    localStorage.setItem(EXPIRES_DATE_TOKEN, action.payload.data.expiresIn);
  }
};

const errorToken: Middleware = () => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${REFRESH_TOKEN} ${API_ERROR}`) {
    localStorage.clear();
  }
};

export default [
  setToken,
  errorToken,
  fetchToken,
];
