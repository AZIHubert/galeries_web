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
  if (action.type === `${RESET_PASSWORD} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setResetPassword({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(setResetPassword({ status: 'error' }));
        dispatch(setNotification({
          error: true,
          text: action.payload.data,
        }));
      }
    } else {
      dispatch(setResetPassword({
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

const fetchResetPassword: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === RESET_PASSWORD_FETCH) {
    dispatch(
      setResetPassword({
        status: 'putting',
      }),
    );
    dispatch(
      apiRequest(
        {
          confirmPassword: action.payload ? action.payload.data.confirmPassword : undefined,
          password: action.payload ? action.payload.data.password : undefined,
        },
        'PUT',
        endPoints.RESET_PASSWORD,
        RESET_PASSWORD,
        action.payload ? action.payload.data.confirmToken : undefined,
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
  if (action.type === `${RESET_PASSWORD} ${API_SUCCESS}`) {
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
