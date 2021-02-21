import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  LOGIN_GOOGLE,
  LOGIN_GOOGLE_FETCH,
  apiRequest,
  fetchUser,
  setLoader,
  setNotification,
} from '#store/actions';

import {
  endPoints,
  localStorages,
} from '#store/constant';

const errorLoginGoogle: Middleware = (
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
  if (type === `${LOGIN_GOOGLE} ${API_ERROR}`) {
    dispatch(
      setNotification(
        'Something went wrong. Please try again.',
        LOGIN_GOOGLE,
      ),
    );
    dispatch(setLoader(false));
  }
};

const fetchLoginGoogle: Middleware = (
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
  if (type === LOGIN_GOOGLE_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        data,
        'POST',
        endPoints.LOGIN_GOOGLE,
        LOGIN_GOOGLE,
      ),
    );
  }
};

const successLoginGoogle: Middleware = (
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
  if (type === `${LOGIN_GOOGLE} ${API_SUCCESS}`) {
    localStorage.setItem(
      localStorages.AUTH_TOKEN,
      data.data.token,
    );
    localStorage.setItem(
      localStorages.EXPIRES_DATE_TOKEN,
      data.data.expiresIn,
    );
    dispatch(fetchUser());
  }
};

export default [
  errorLoginGoogle,
  fetchLoginGoogle,
  successLoginGoogle,
];
