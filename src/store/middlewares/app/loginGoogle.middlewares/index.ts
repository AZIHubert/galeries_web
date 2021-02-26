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
  if (action.type === `${LOGIN_GOOGLE} ${API_ERROR}`) {
    dispatch(
      setNotification({
        error: true,
        text: action.payload ? action.payload.data : 'Something went wrong.',
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
  if (action.type === LOGIN_GOOGLE_FETCH) {
    const requestData = {
      email: action.payload ? action.payload.data.email : undefined,
      id: action.payload ? action.payload.data.googleId : undefined,
      imageUrl: action.payload ? action.payload.data.photoUrl : undefined,
      name: action.payload ? action.payload.data.name : undefined,
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
  if (action.type === `${LOGIN_GOOGLE} ${API_SUCCESS}`) {
    if (action.payload) {
      setAuthToken(action.payload.data.token);
      setExpiresToken(action.payload.data.expiresIn);
    }
    dispatch(fetchUser());
  }
};

export default [
  errorLoginGoogle,
  fetchLoginGoogle,
  successLoginGoogle,
];
