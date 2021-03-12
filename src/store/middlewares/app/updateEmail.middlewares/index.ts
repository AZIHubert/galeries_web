import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_EMAIL_POST,
  apiRequest,
  setLoader,
  setNotification,
  setUpdateEmail,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorUpdateEmail: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_EMAIL} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setUpdateEmail({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(
          setUpdateEmail({
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
        setUpdateEmail({
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

const postUpdateEmail: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === UPDATE_EMAIL_POST) {
    dispatch(
      setUpdateEmail({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'POST',
        endPoints.UPDATE_EMAIL,
        UPDATE_EMAIL,
      ),
    );
  }
};

const successUpdateEmail: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${UPDATE_EMAIL} ${API_SUCCESS}`) {
    dispatch(setUpdateEmail({
      status: 'success',
    }));
    dispatch(setNotification({
      error: false,
      text: 'an email has been sent to you',
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorUpdateEmail,
  postUpdateEmail,
  successUpdateEmail,
];
