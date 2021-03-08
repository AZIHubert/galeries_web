import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  PROFILE_PICTURE,
  PROFILE_PICTURE_POST,
  PROFILE_PICTURE_PUT,
  apiRequest,
  setLoader,
  setNotification,
  setProfilePicture,
  setProfilePictures,
  setUser,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

import { selectProfilPicture } from '#store/helpers';

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

const putProfilePicture: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === PROFILE_PICTURE_PUT) {
    dispatch(
      setProfilePicture({
        status: 'putting',
      }),
    );
    dispatch(
      apiRequest(
        null,
        'PUT',
        endPoints.PROFILE_PICTURE,
        PROFILE_PICTURE,
        undefined,
        undefined,
        undefined,
        action.payload ? action.payload.data.id : undefined,
      ),
    );
  }
};

const postProfilePicture: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === PROFILE_PICTURE_POST) {
    dispatch(
      setProfilePicture({
        status: 'posting',
      }),
    );
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
    if (action.payload && action.payload.data) {
      const {
        id,
        ...rest
      }: ProfilePictureI = action.payload.data;
      dispatch(setUser({
        ...getState().user,
        currentProfilePictureId: id,
        currentProfilePicture: { ...rest },
      }));
      dispatch(setProfilePictures({
        profilePictures: {
          [id]: { ...rest },
          ...getState().profilePictures.profilePictures,
        },
      }));
    } else {
      dispatch(setUser({
        ...getState().user,
        currentProfilePictureId: null,
        currentProfilePicture: null,
      }));
    }
    const currentProfilePicture = selectProfilPicture(getState().user);
    dispatch(setProfilePicture({
      status: 'success',
      current: currentProfilePicture,
    }));
    dispatch(setLoader(false));
  }
};

export default [
  errorProfilePicture,
  postProfilePicture,
  putProfilePicture,
  successProfilePicture,
];
