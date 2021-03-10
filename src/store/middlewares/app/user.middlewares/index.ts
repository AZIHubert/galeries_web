import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  USER,
  USER_FETCH,
  apiRequest,
  setInit,
  setLoader,
  setNotification,
  setUser,
  setProfilePicture,
} from '#store/actions';

import { endPoints } from '#store/constant';

import { selectProfilPicture } from '#store/helpers';

const errorUser: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${USER} ${API_ERROR}`) {
    dispatch(setNotification({
      error: true,
      text: action.payload ? action.payload.data : 'Something went wrong.',
    }));
    dispatch(setInit(false));
    dispatch(setLoader(false));
  }
};

const fetchUser: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === USER_FETCH) {
    dispatch(
      apiRequest(
        null,
        'GET',
        endPoints.GET_ME,
        USER,
      ),
    );
  }
};

const getUser: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${USER} ${API_SUCCESS}`) {
    const user = action.payload ? action.payload.data : undefined;
    dispatch(setUser(user));
    const currentProfilePicture = selectProfilPicture(user);
    dispatch(setProfilePicture({ current: currentProfilePicture }));
    dispatch(setInit(false));
    dispatch(setLoader(false));
  }
};

export default [
  errorUser,
  fetchUser,
  getUser,
];
