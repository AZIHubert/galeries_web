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
  { dispatch, getState },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === PROFILE_PICTURES_FETCH && !getState().profilePictures.end) {
    dispatch(setProfilePictures({
      status: 'fetching',
      profilePictures: getState().profilePictures.profilePictures,
    }));
    dispatch(
      apiRequest(
        null,
        'GET',
        endPoints.PROFILE_PICTURE,
        PROFILE_PICTURES,
        undefined,
        undefined,
        getState().profilePictures.page + 1,
      ),
    );
  }
};

const successProfilePictures: Middleware = (
  { dispatch, getState },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PROFILE_PICTURES} ${API_SUCCESS}`) {
    if (action.payload) {
      const newProfilePictures = action.payload.data;
      const normalizeData = newProfilePictures.map(
        ({ id, ...rest }: ProfilePictureI) => ({
          [id]: { ...rest },
        }),
      );
      const newObject = Object.assign({}, ...normalizeData);
      dispatch(setProfilePictures({
        page: getState().profilePictures.page + 1,
        end: newProfilePictures.length < 20,
        status: 'success',
        profilePictures: {
          ...getState().profilePictures.profilePictures,
          ...newObject,
        },
      }));
    }
    dispatch(setLoader(false));
  }
};

export default [
  errorProfilePictures,
  fetchProfilePictures,
  successProfilePictures,
];
