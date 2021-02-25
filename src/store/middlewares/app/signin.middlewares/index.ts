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
  const {
    payload: { data },
    type,
  } = action;
  if (type === `${SIGNIN} ${API_ERROR}`) {
    if (typeof data === 'object') {
      dispatch(setSignin({
        status: 'error',
        errors: data,
      }));
    } else {
      dispatch(setSignin({ status: 'error' }));
      dispatch(setNotification({
        error: true,
        text: data,
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
  const {
    type,
    payload: { data },
  } = action;
  if (type === SIGNIN_FETCH) {
    dispatch(setLoader(true));
    dispatch(setSignin({ status: 'pending' }));
    dispatch(
      apiRequest(
        data,
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
  const {
    type,
    payload: { data },
  } = action;
  if (type === `${SIGNIN} ${API_SUCCESS}`) {
    dispatch(setSignin({ status: 'success' }));
    dispatch(fetchSendConfirmation({ email: data.email }));
  }
};

export default [
  errorSignin,
  fetchSignin,
  successSignin,
];
