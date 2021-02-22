import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setResetPasswordError,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorResetPassword: Middleware = (
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
  if (type === `${RESET_PASSWORD} ${API_ERROR}`) {
    if (typeof data.errors === 'object') {
      dispatch(setResetPasswordError(data.errors));
    } else {
      dispatch(setNotification({
        error: true,
        text: data.errors,
      }));
    }
    dispatch(setLoader(false));
  }
};

const fetchResetPassword: Middleware = (
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
  if (type === RESET_PASSWORD_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        {
          confirmPassword: data.confirmPassword,
          password: data.password,
        },
        'PUT',
        endPoints.RESET_PASSWORD,
        RESET_PASSWORD,
        data.confirmationToken,
      ),
    );
  }
};

const successResetPassword: Middleware = (
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
  if (type === `${RESET_PASSWORD} ${API_SUCCESS}`) {
    dispatch(setLoader(false));
  }
};

export default [
  errorResetPassword,
  fetchResetPassword,
  successResetPassword,
];
