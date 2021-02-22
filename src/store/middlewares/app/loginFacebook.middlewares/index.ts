import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  LOGIN_FACEBOOK,
  LOGIN_FACEBOOK_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  fetchUser,
} from '#store/actions';

import {
  endPoints,
  localStorages,
} from '#store/constant';

const errorFacebook: Middleware = (
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
  if (type === `${LOGIN_FACEBOOK} ${API_ERROR}`) {
    dispatch(
      setNotification({
        error: true,
        text: 'Something went wrong. Please try again.',
      }),
    );
    dispatch(setLoader(false));
  }
};

const fetchFacebook: Middleware = (
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
  if (type === LOGIN_FACEBOOK_FETCH) {
    dispatch(setLoader(true));
    dispatch(
      apiRequest(
        data,
        'POST',
        endPoints.LOGIN_FACEBOOK,
        LOGIN_FACEBOOK,
      ),
    );
  }
};

const successFacebook: Middleware = (
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
  if (type === `${LOGIN_FACEBOOK} ${API_SUCCESS}`) {
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
  errorFacebook,
  fetchFacebook,
  successFacebook,
];
