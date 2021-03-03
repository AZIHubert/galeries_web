import { Middleware } from 'redux';

import {
  API_SUCCESS,
  API_ERROR,
  PROFILE_PICTURES,
  PROFILE_PICTURES_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setProfilePictures,
} from '#store/actions';

import { endPoints } from '#store/constant';

const errorProfilePictures: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PROFILE_PICTURES} ${API_ERROR}`) {
    dispatch(setNotification({
      error: true,
      text: action.payload ? action.payload.data : 'Something went wrong.',
    }));
    dispatch(setProfilePictures({
      status: 'error',
    }));
    dispatch(setLoader(false));
  }
};

const fetchProfilePictures: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === PROFILE_PICTURES_FETCH) {
    dispatch(setProfilePictures({
      status: 'fetching',
    }));
    dispatch(
      apiRequest(
        null,
        'GET',
        endPoints.PROFILE_PICTURE,
        PROFILE_PICTURES,
      ),
    );
  }
};

const successProfilePictures: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PROFILE_PICTURES} ${API_SUCCESS}`) {
    dispatch(setProfilePictures({
      status: 'success',
      profilePictures: action.payload ? action.payload.data : [],
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorProfilePictures,
  fetchProfilePictures,
  successProfilePictures,
];
