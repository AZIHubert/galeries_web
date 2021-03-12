import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  UPDATE_EMAIL_CONFIRM,
  UPDATE_EMAIL_CONFIRM_POST,
  apiRequest,
  setLoader,
  setNotification,
  setUpdateEmailConfirm,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorUpdateEmailConfirm: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_EMAIL_CONFIRM} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setUpdateEmailConfirm({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(
          setUpdateEmailConfirm({
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
        setUpdateEmailConfirm({
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

const postUpdateEmailConfirm: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === UPDATE_EMAIL_CONFIRM_POST) {
    dispatch(
      setUpdateEmailConfirm({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        {
          email: action.payload ? action.payload.data.email : undefined,
          password: action.payload ? action.payload.data.password : undefined,
        },
        'POST',
        endPoints.UPDATE_EMAIL_CONFIRM,
        UPDATE_EMAIL_CONFIRM,
        action.payload ? action.payload.data.confirmToken : undefined,
      ),
    );
  }
};

const successUpdateEmailConfirm: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_EMAIL_CONFIRM} ${API_SUCCESS}`) {
    dispatch(setUpdateEmailConfirm({
      status: 'success',
    }));
    dispatch(setNotification({
      error: false,
      text: 'an email has been sent to the email address you register',
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorUpdateEmailConfirm,
  postUpdateEmailConfirm,
  successUpdateEmailConfirm,
];
