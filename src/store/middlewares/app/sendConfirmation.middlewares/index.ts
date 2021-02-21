import { Middleware } from 'redux';

import {
  API_ERROR,
  SEND_CONFIRMATION,
  SEND_CONFIRMATION_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setSendConfirmationError,
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
    if (typeof data.errors === 'object') {
      setSendConfirmationError(data.errors);
    } else {
      setNotification(data.errors, SEND_CONFIRMATION);
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
  if (type === SEND_CONFIRMATION_FETCH) {
    dispatch(setLoader(false));
  }
};

export default [
  errorSendConfirmation,
  fetchSendConfirmation,
  successSendConfirmation,
];
