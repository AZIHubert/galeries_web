import moment from 'moment';
import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  LOGIN,
  LOGIN_FETCH,
  apiRequest,
  fetchUser,
  setLoader,
  setLogin,
  setNotification,
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
    if (typeof data === 'object') {
      dispatch(setLogin({
        errors: data,
        status: 'error',
      }));
    } else {
      dispatch(setLogin({
        status: 'error',
      }));
      dispatch(setNotification({
        error: true,
        text: data,
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
    dispatch(setLogin({ status: 'pending' }));
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
      JSON.stringify(moment().add(data.expiresIn, 's').valueOf()),
    );
    dispatch(fetchUser());
  }
};

export default [
  errorLogin,
  fetchLogin,
  successLogin,
];
