import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  SEND_CONFIRMATION,
  SEND_CONFIRMATION_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setSendConfirmation,
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
  if (action.type === `${SEND_CONFIRMATION} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(setSendConfirmation({
          status: 'error',
          errors: action.payload.data,
        }));
      } else {
        dispatch(setSendConfirmation({ status: 'error' }));
        dispatch(setNotification({
          text: action.payload.data,
          error: true,
        }));
      }
    } else {
      dispatch(setSendConfirmation({
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

const fetchSendConfirmation: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === SEND_CONFIRMATION_FETCH) {
    dispatch(
      setSendConfirmation({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
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
  if (action.type === `${SEND_CONFIRMATION} ${API_SUCCESS}`) {
    dispatch(setSendConfirmation({ status: 'success' }));
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
