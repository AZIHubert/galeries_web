import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  ACCOUNT,
  ACCOUNT_DELETE,
  apiRequest,
  resetProfilePictures,
  setAccount,
  setLoader,
  setNotification,
  setUser,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorAccount: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${ACCOUNT} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setAccount({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(
          setAccount({
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
        setAccount({
          status: 'error',
        }),
      );
      dispatch(setNotification({
        error: true,
        text: 'Something went wrong.',
      }));
    }
    dispatch(setLoader(false));
  }
};

const deleteAccount: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === ACCOUNT_DELETE) {
    dispatch(
      setAccount({
        status: 'delete',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'DELETE',
        endPoints.GET_ME,
        ACCOUNT,
      ),
    );
  }
};

const successAccount: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${ACCOUNT} ${API_SUCCESS}`) {
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(resetProfilePictures());
    dispatch(setLoader(false));
  }
};

export default [
  errorAccount,
  deleteAccount,
  successAccount,
];
