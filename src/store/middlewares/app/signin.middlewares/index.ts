import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  SIGNIN,
  SIGNIN_FETCH,
  apiRequest,
  fetchSendConfirmation,
  setLoader,
  setNotification,
  setSignin,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorSignin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${SIGNIN} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(setSignin({
          status: 'error',
          errors: action.payload.data,
        }));
      } else {
        dispatch(setSignin({ status: 'error' }));
        dispatch(setNotification({
          error: true,
          text: action.payload.data,
        }));
      }
    } else {
      dispatch(setSignin({
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

const fetchSignin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === SIGNIN_FETCH) {
    dispatch(
      setSignin({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'POST',
        endPoints.SIGNIN,
        SIGNIN,
        undefined,
      ),
    );
  }
};

const successSignin: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${SIGNIN} ${API_SUCCESS}`) {
    dispatch(setSignin({ status: 'success' }));
    dispatch(fetchSendConfirmation({
      email: action.payload ? action.payload.data.email : undefined,
    }));
  }
};

export default [
  errorSignin,
  fetchSignin,
  successSignin,
];
