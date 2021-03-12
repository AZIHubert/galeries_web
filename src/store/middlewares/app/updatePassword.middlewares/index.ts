import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_PUT,
  apiRequest,
  setUpdatePassword,
  setLoader,
  setNotification,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

import {
  setAuthToken,
  setExpiresToken,
} from '#store/helpers';

const errorUpdatePassword: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_PASSWORD} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setUpdatePassword({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(
          setUpdatePassword({
            status: 'error',
          }),
        );
        dispatch(
          setNotification({
            text: action.payload.data,
            error: true,
          }),
        );
      }
    } else {
      dispatch(
        setUpdatePassword({
          status: 'error',
        }),
      );
      dispatch(
        setNotification({
          error: true,
          text: 'Something went wrong.',
        }),
      );
    }
    dispatch(setLoader(false));
  }
};

const putUpdatePassword: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === UPDATE_PASSWORD_PUT) {
    dispatch(
      setUpdatePassword({
        status: 'putting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'PUT',
        endPoints.UPDATE_PASSWORD,
        UPDATE_PASSWORD,
      ),
    );
  }
};

const successUpdatePassword: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_PASSWORD} ${API_SUCCESS}`) {
    if (action.payload) {
      setAuthToken(action.payload.data.token);
      setExpiresToken(action.payload.data.expiresIn);
    }
    dispatch(setUpdatePassword({
      status: 'success',
    }));
    dispatch(
      setNotification({
        error: false,
        text: 'you\'re password has been modify successfully',
      }),
    );
    dispatch(setLoader(false));
  }
};

export default [
  errorUpdatePassword,
  putUpdatePassword,
  successUpdatePassword,
];
