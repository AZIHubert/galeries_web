import { Middleware } from 'redux';

import {
  INIT_USER_FETCH,
  fetchUser,
  setInit,
} from '#store/actions';

import {
  getAuthToken,
  getExpiresToken,
} from '#store/helpers';

const fetchInitUser: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action,
) => {
  next(action);
  if (action.type === INIT_USER_FETCH) {
    const authToken = getAuthToken();
    const expiresToken = getExpiresToken();
    if (authToken && expiresToken) {
      dispatch(setInit(true));
      dispatch(fetchUser());
    } else {
      localStorage.clear();
    }
  }
};

export default [
  fetchInitUser,
];
