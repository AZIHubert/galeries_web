import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  PROFILE_PICTURE,
  PROFILE_PICTURE_FETCH,
  apiRequest,
  setLoader,
  setNotification,
  setProfilePicture,
  setProfilePictures,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorProfilePicture: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PROFILE_PICTURE} ${API_ERROR}`) {
    if (action.payload) {
      dispatch(setProfilePicture({
        status: 'error',
      }));
      dispatch(setNotification({
        error: true,
        text: action.payload.data,
      }));
    } else {
      dispatch(setProfilePicture({
        status: 'error',
      }));
      dispatch(setNotification({
        error: true,
        text: 'Something went wrong.',
      }));
    }
    dispatch(setLoader(false));
  }
};

const fetchProfilePicture: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === PROFILE_PICTURE_FETCH) {
    dispatch(setProfilePicture({ status: 'fetching' }));
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'POST',
        endPoints.PROFILE_PICTURE,
        PROFILE_PICTURE,
        undefined,
        'application/json',
      ),
    );
  }
};

const successProfilePicture: Middleware = (
  {
    dispatch,
    getState,
  },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PROFILE_PICTURE} ${API_SUCCESS}`) {
    if (action.payload) {
      const { id, ...rest }: ProfilePictureI = action.payload.data;
      dispatch(setProfilePictures({
        profilePictures: {
          [id]: { ...rest },
          ...getState().profilePictures.profilePictures,
        },
      }));
      dispatch(setProfilePicture({
        status: 'success',
        current: {
          croped: action.payload.data.cropedImage.signedUrl,
          original: action.payload.data.originalImage.signedUrl,
          pending: action.payload.data.pendingImage.signedUrl,
        },
      }));
    }
    dispatch(setLoader(false));
  }
};

export default [
  errorProfilePicture,
  fetchProfilePicture,
  successProfilePicture,
];
