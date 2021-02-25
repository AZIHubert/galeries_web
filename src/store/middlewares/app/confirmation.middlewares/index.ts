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
  const {
    payload: { data },
    type,
  } = action;
  if (type === `${CONFIRMATION} ${API_ERROR}`) {
    dispatch(setNotification({
      error: true,
      text: data,
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
  const {
    payload: { data },
    type,
  } = action;
  if (type === CONFIRMATION_FETCH) {
    dispatch(
      apiRequest(
        null,
        'PUT',
        endPoints.CONFIRMATION,
        CONFIRMATION,
        data,
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
  const {
    payload: { data },
    type,
  } = action;
  if (type === `${CONFIRMATION} ${API_SUCCESS}`) {
    setAuthToken(data.token);
    setExpiresToken(data.expiresIn);
    dispatch(fetchUser());
  }
};

export default [
  errorConfirmation,
  fetchConfirmation,
  successConfiramtion,
];
