import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  SEND_RESET_PASSWORD,
  SEND_RESET_PASSWORD_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setSendResetPassword,
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
  if (action.type === `${SEND_RESET_PASSWORD} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setSendResetPassword({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(setSendResetPassword({ status: 'error' }));
        dispatch(
          setNotification({
            error: true,
            text: action.payload.data,
          }),
        );
      }
    } else {
      dispatch(setSendResetPassword({
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

const fetchSendResetPassword: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === SEND_RESET_PASSWORD_FETCH) {
    dispatch(
      setSendResetPassword({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
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
    dispatch(setSendResetPassword({ status: 'success' }));
    dispatch(setNotification({
      text: 'an email has been sent to you',
      error: false,
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorSendResetPassword,
  fetchSendResetPassword,
  successSendResetPassword,
];
