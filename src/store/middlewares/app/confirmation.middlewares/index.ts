import { Middleware } from 'redux';

import {
  API_ERROR,
  CONFIRMATION,
  CONFIRMATION_FETCH,
  setNotification,
  apiRequest,
  setLoader,
  API_SUCCESS,
} from '#store/actions';

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
    dispatch(setNotification(data.errors, CONFIRMATION));
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
    dispatch(setLoader(false));
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
    type,
  } = action;
  if (type === `${CONFIRMATION} ${API_SUCCESS}`) {
    dispatch(setLoader(false));
  }
};

export default [
  errorConfirmation,
  fetchConfirmation,
  successConfiramtion,
];
