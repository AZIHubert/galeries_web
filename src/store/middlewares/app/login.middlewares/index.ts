import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  LOGIN,
  LOGIN_FETCH,
  apiRequest,
  fetchUser,
  setLoader,
  setNotification,
  setLogin,
} from '#store/actions';

import {
  endPoints,
  localStorages,
} from '#store/constant';

const errorLogin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const {
    payload: { data },
    type,
  } = action;
  if (type === `${LOGIN} ${API_ERROR}`) {
    if (typeof data.response.data.errors === 'object') {
      dispatch(setLogin({
        status: 'error',
        errors: data.response.data.errors,
      }));
    } else {
      dispatch(setLogin({
        status: 'error',
      }));
      dispatch(setNotification({
        text: data.response.data.errors,
        error: true,
      }));
    }
    dispatch(setLoader(false));
  }
};

const fetchLogin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const {
    payload: { data },
    type,
  } = action;
  if (type === LOGIN_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        data,
        'POST',
        endPoints.LOGIN,
        LOGIN,
      ),
    );
  }
};

const successLogin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action,
) => {
  next(action);
  const {
    payload: { data },
    type,
  } = action;
  if (type === `${LOGIN} ${API_SUCCESS}`) {
    dispatch(setLogin({
      status: 'success',
    }));
    localStorage.setItem(
      localStorages.AUTH_TOKEN,
      data.token,
    );
    localStorage.setItem(
      localStorages.EXPIRES_DATE_TOKEN,
      data.expiresIn,
    );
    dispatch(fetchUser());
  }
};

export default [
  errorLogin,
  fetchLogin,
  successLogin,
];
