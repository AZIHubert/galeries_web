import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  SEND_TICKET,
  SEND_TICKET_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setSendTicket,
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
  if (action.type === `${SEND_TICKET} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(setSendTicket({
          status: 'error',
          errors: action.payload.data,
        }));
      } else {
        dispatch(setSendTicket({
          status: 'error',
        }));
        dispatch(setNotification({
          text: action.payload.data,
          error: true,
        }));
      }
    } else {
      dispatch(setSendTicket({
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

const fetchSendTicket: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === SEND_TICKET_FETCH) {
    dispatch(
      setSendTicket({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'POST',
        endPoints.TICKET,
        SEND_TICKET,
      ),
    );
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
  if (action.type === `${SEND_TICKET} ${API_SUCCESS}`) {
    dispatch(setSendTicket({ status: 'success' }));
    dispatch(setNotification({
      error: false,
      text: 'you\'re ticket has been send',
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorSendTicket,
  fetchSendTicket,
  successSendTicket,
];
