import { Middleware } from 'redux';

import {
  API_SUCCESS,
  API_ERROR,
  LOGOUT,
  LOGOUT_FETCH,
  apiRequest,
  resetProfilePictures,
  setLoader,
  setNotification,
  setUser,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorLogout: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${LOGOUT} ${API_ERROR}`) {
    dispatch(
      setNotification({
        error: true,
        text: action.payload ? action.payload.data : 'Something went wrong.',
      }),
    );
    dispatch(setLoader(false));
  }
};

const fetchLogout: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === LOGOUT_FETCH) {
    dispatch(
      apiRequest(
        null,
        'GET',
        endPoints.LOGOUT,
        LOGOUT,
      ),
    );
  }
};

const successLogout: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${LOGOUT} ${API_SUCCESS}`) {
    localStorage.clear();
    dispatch(setUser(null));
    dispatch(resetProfilePictures());
    dispatch(setLoader(false));
  }
};

export default [
  errorLogout,
  fetchLogout,
  successLogout,
];
