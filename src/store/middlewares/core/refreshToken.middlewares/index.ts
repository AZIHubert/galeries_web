import moment from 'moment';
import { Middleware } from 'redux';

import {
  endpoints,
  localStorages,
} from '#store/constant';

import {
  apiRequest,
  REFRESH_TOKEN,
  setLoader,
  API_SUCCESS,
  API_ERROR,
} from '#store/actions';

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

const fetchToken: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const token = localStorage.getItem(localStorages.AUTH_TOKEN);
  const expiresIn = localStorage.getItem(localStorages.EXPIRES_DATE_TOKEN);
  if (token && expiresIn) {
    const expiresAt = JSON.parse(expiresIn);
    const isExpired = moment().isAfter(moment(expiresAt));
    if (isExpired) {
      dispatch(setLoader(true));
      dispatch(apiRequest(null, 'GET', endpoints.REFRESH_TOKEN, REFRESH_TOKEN));
    }
  }
};

const getToken: Middleware = () => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${REFRESH_TOKEN} ${API_SUCCESS}`) {
    localStorage.setItem(
      localStorages.AUTH_TOKEN,
      action.payload.data.token,
    );
    localStorage.setItem(
      localStorages.EXPIRES_DATE_TOKEN,
      action.payload.data.expiresIn,
    );
  }
};

export default [
  errorToken,
  fetchToken,
  getToken,
];
