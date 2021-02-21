import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  SEND_RESET_PASSWORD,
  SEND_RESET_PASSWORD_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setResetPasswordError,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorSendResetPassword: Middleware = (
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
  if (type === `${SEND_RESET_PASSWORD} ${API_ERROR}`) {
    if (typeof data.errors === 'object') {
      setResetPasswordError(data.errors);
    } else {
      setNotification(data.errors, SEND_RESET_PASSWORD);
    }
    dispatch(setLoader(false));
  }
};

const fetchSendResetPassword: Middleware = (
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
  if (type === SEND_RESET_PASSWORD_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        data,
        'POST',
        endPoints.RESET_PASSWORD,
        SEND_RESET_PASSWORD,
      ),
    );
  }
};

const successSendResetPassword: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  const {
    type,
  } = action;
  if (type === `${SEND_RESET_PASSWORD} ${API_SUCCESS}`) {
    dispatch(setLoader(false));
  }
};

export default [
  errorSendResetPassword,
  fetchSendResetPassword,
  successSendResetPassword,
];
