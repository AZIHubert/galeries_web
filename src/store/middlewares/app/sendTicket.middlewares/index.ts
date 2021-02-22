import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  SEND_TICKET,
  SEND_TICKET_FETCH,
  apiRequest,
  setLoader,
  setSendTicket,
  setNotification,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorSendTicket: Middleware = (
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
  if (type === `${SEND_TICKET} ${API_ERROR}`) {
    if (typeof data.response.data.errors === 'object') {
      dispatch(setSendTicket({
        status: 'error',
        errors: data.response.data.errors,
      }));
    } else {
      dispatch(setSendTicket({
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

const fetchSendTicket: Middleware = (
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
  if (type === `${SEND_TICKET} ${API_SUCCESS}`) {
    dispatch(setSendTicket({
      status: 'success',
    }));
    dispatch(setNotification({
      error: false,
      text: 'you\'re ticket has been send',
    }));
    dispatch(setLoader(false));
  }
};

const successSendTicket: Middleware = (
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
  if (type === SEND_TICKET_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        data,
        'POST',
        endPoints.TICKET,
        SEND_TICKET,
      ),
    );
  }
};

export default [
  errorSendTicket,
  fetchSendTicket,
  successSendTicket,
];
