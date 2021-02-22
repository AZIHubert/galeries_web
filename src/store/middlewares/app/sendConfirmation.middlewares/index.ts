import { Middleware } from 'redux';

import {
  API_ERROR,
  SEND_CONFIRMATION,
  SEND_CONFIRMATION_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setSendConfirmation,
  API_SUCCESS,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorSendConfirmation: Middleware = (
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
  if (type === `${SEND_CONFIRMATION} ${API_ERROR}`) {
    if (typeof data.response.data.errors === 'object') {
      dispatch(setSendConfirmation({
        status: 'error',
        errors: data.response.data.errors,
      }));
    } else {
      dispatch(setSendConfirmation({
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

const fetchSendConfirmation: Middleware = (
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
  if (type === SEND_CONFIRMATION_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        data,
        'POST',
        endPoints.CONFIRMATION,
        SEND_CONFIRMATION,
      ),
    );
  }
};

const successSendConfirmation: Middleware = (
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
  if (type === `${SEND_CONFIRMATION} ${API_SUCCESS}`) {
    dispatch(setSendConfirmation({
      status: 'success',
    }));
    dispatch(setNotification({
      text: 'an email has been sent to you',
      error: false,
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorSendConfirmation,
  fetchSendConfirmation,
  successSendConfirmation,
];
