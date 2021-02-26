import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setResetPassword,
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
    if (typeof data === 'object') {
      dispatch(
        setResetPassword({
          errors: data,
          status: 'error',
        }),
      );
    } else {
      dispatch(setResetPassword({ status: 'error' }));
      dispatch(setNotification({
        error: true,
        text: data,
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
    dispatch(setResetPassword({ status: 'pending' }));
    dispatch(
      apiRequest(
        {
          confirmPassword: data.confirmPassword,
          password: data.password,
        },
        'PUT',
        endPoints.RESET_PASSWORD,
        RESET_PASSWORD,
        data.confirmToken,
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
    dispatch(setResetPassword({ status: 'success' }));
    dispatch(setNotification({
      error: false,
      text: 'you\'re password has been successfully changed.',
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorResetPassword,
  fetchResetPassword,
  successResetPassword,
];
