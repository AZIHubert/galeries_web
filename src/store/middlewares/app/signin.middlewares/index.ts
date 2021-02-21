import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  SIGNIN,
  SIGNIN_FETCH,
  apiRequest,
  fetchSendConfirmation,
  setLoader,
  setNotification,
  setSigninError,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorSignin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const {
    type,
    payload: { data },
  } = action;
  if (type === `${SIGNIN} ${API_ERROR}`) {
    if (typeof data.errors === 'object') {
      dispatch(setSigninError(data.errors));
      dispatch(setLoader(false));
    } else {
      dispatch(setNotification(data.errors, SIGNIN));
    }
  }
};

const fetchSignin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const {
    type,
    payload: { data },
  } = action;
  if (type === SIGNIN_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        data,
        'POST',
        endPoints.SIGNIN,
        SIGNIN,
      ),
    );
  }
};

const successSignin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const {
    type,
    payload: { data },
  } = action;
  if (type === `${SIGNIN} ${API_SUCCESS}`) {
    dispatch(
      fetchSendConfirmation(data.email),
    );
  }
};

export default [
  errorSignin,
  fetchSignin,
  successSignin,
];
