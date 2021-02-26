import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  CONFIRMATION,
  CONFIRMATION_FETCH,
  apiRequest,
  fetchUser,
  setLoader,
  setNotification,
} from '#store/actions';

import {
  setAuthToken,
  setExpiresToken,
} from '#store/helpers';

import {
  endPoints,
} from '#store/constant';

const errorConfirmation: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${CONFIRMATION} ${API_ERROR}`) {
    dispatch(setNotification({
      error: true,
      text: action.payload ? action.payload.data : 'Something went wrong',
    }));
    dispatch(setLoader(false));
  }
};

const fetchConfirmation: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === CONFIRMATION_FETCH) {
    dispatch(
      apiRequest(
        null,
        'PUT',
        endPoints.CONFIRMATION,
        CONFIRMATION,
        action.payload ? action.payload.data : undefined,
      ),
    );
  }
};

const successConfiramtion: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${CONFIRMATION} ${API_SUCCESS}`) {
    if (action.payload) {
      setAuthToken(action.payload.data.token);
      setExpiresToken(action.payload.data.expiresIn);
    }
    dispatch(fetchUser());
  }
};

export default [
  errorConfirmation,
  fetchConfirmation,
  successConfiramtion,
];
