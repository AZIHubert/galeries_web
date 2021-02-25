import { Middleware } from 'redux';

import {
  API_SUCCESS,
  API_ERROR,
  LOGOUT,
  LOGOUT_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setUser,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorLogout: Middleware = (
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
  if (type === `${LOGOUT} ${API_ERROR}`) {
    dispatch(
      setNotification({
        error: true,
        text: data,
      }),
    );
    dispatch(setLoader(false));
  }
};

const fetchLogout: Middleware = (
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
  if (type === LOGOUT_FETCH) {
    dispatch(
      apiRequest(
        null,
        'GET',
        endPoints.LOGOUT,
        LOGOUT,
      ),
    );
  }
};

const successLogout: Middleware = (
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
  if (type === `${LOGOUT} ${API_SUCCESS}`) {
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(setLoader(false));
  }
};

export default [
  errorLogout,
  fetchLogout,
  successLogout,
];
