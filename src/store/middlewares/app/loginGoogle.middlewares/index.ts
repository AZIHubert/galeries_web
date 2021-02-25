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

import { endPoints } from '#store/constant';

import {
  setAuthToken,
  setExpiresToken,
} from '#store/helpers';

const errorLoginGoogle: Middleware = (
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
  if (type === `${LOGIN_GOOGLE} ${API_ERROR}`) {
    dispatch(
      setNotification({
        error: true,
        text: data,
      }),
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
    const requestData = {
      email: data.email,
      id: data.googleId,
      imageUrl: data.photoUrl,
      name: data.name,
    };
    dispatch(
      apiRequest(
        requestData,
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
    setAuthToken(data.token);
    setExpiresToken(data.expiresIn);
    dispatch(fetchUser());
  }
};

export default [
  errorLoginGoogle,
  fetchLoginGoogle,
  successLoginGoogle,
];
