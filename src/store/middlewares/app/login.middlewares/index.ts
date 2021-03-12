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

import { endPoints } from '#store/constant';

import {
  setAuthToken,
  setExpiresToken,
} from '#store/helpers';

const errorLogin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${LOGIN} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(setLogin({
          errors: action.payload.data,
          status: 'error',
        }));
      } else {
        dispatch(setLogin({
          status: 'error',
        }));
        dispatch(setNotification({
          error: true,
          text: action.payload.data,
        }));
      }
    } else {
      dispatch(setLogin({
        status: 'error',
      }));
      dispatch(setNotification({
        error: true,
        text: 'Something went wrong.',
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
  if (action.type === LOGIN_FETCH) {
    dispatch(
      setLogin({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
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
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${LOGIN} ${API_SUCCESS}`) {
    if (action.payload) {
      setAuthToken(action.payload.data.token);
      setExpiresToken(action.payload.data.expiresIn);
    }
    dispatch(setLogin({
      status: 'success',
    }));
    dispatch(fetchUser());
  }
};

export default [
  errorLogin,
  fetchLogin,
  successLogin,
];
