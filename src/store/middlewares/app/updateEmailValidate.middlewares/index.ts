import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  UPDATE_EMAIL_VALIDATE,
  UPDATE_EMAIL_VALIDATE_PUT,
  apiRequest,
  setUpdateEmailValidate,
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

const errorUpdateEmailValidate: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_EMAIL_VALIDATE} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setUpdateEmailValidate({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(
          setUpdateEmailValidate({
            status: 'error',
          }),
        );
        dispatch(
          setNotification({
            error: true,
            text: action.payload.data,
          }),
        );
      }
    } else {
      dispatch(
        setUpdateEmailValidate({
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

const putUpdateEmailValidate: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === UPDATE_EMAIL_VALIDATE_PUT) {
    dispatch(
      setUpdateEmailValidate({
        status: 'putting',
      }),
    );
    dispatch(
      apiRequest(
        {
          password: action.payload ? action.payload.data.password : undefined,
        },
        'PUT',
        endPoints.UPDATE_EMAIL,
        UPDATE_EMAIL_VALIDATE,
        action.payload ? action.payload.data.confirmToken : undefined,
      ),
    );
  }
};

const successUpdateEmailValidate: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_EMAIL_VALIDATE} ${API_SUCCESS}`) {
    if (action.payload) {
      setAuthToken(action.payload.data.token);
      setExpiresToken(action.payload.data.expiresIn);
    }
    dispatch(setUpdateEmailValidate({
      status: 'success',
    }));
    dispatch(setNotification({
      error: false,
      text: 'Your email has been changed',
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorUpdateEmailValidate,
  putUpdateEmailValidate,
  successUpdateEmailValidate,
];
