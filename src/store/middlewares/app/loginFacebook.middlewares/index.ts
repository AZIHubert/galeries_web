import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  LOGIN_FACEBOOK,
  LOGIN_FACEBOOK_FETCH,
  apiRequest,
  fetchUser,
  setLoader,
  setNotification,
} from '#store/actions';

import { endPoints } from '#store/constant';

import {
  setAuthToken,
  setExpiresToken,
} from '#store/helpers';

const errorFacebook: Middleware = (
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
  if (type === `${LOGIN_FACEBOOK} ${API_ERROR}`) {
    dispatch(
      setNotification({
        error: true,
        text: data,
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
    setAuthToken(data.token);
    setExpiresToken(data.expiresIn);
    dispatch(fetchUser());
  }
};

export default [
  errorFacebook,
  fetchFacebook,
  successFacebook,
];
