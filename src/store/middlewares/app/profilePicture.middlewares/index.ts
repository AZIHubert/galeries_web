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
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PROFILE_PICTURE} ${API_SUCCESS}`) {
    dispatch(setProfilePicture({
      status: 'success',
      current: {
        croped: action.payload ? action.payload.data.cropedImage.signedUrl : undefined,
        original: action.payload ? action.payload.data.originalImage.signedUrl : undefined,
        pending: action.payload ? action.payload.data.pendingImage.signedUrl : undefined,
      },
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorProfilePicture,
  fetchProfilePicture,
  successProfilePicture,
];
