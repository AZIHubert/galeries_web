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
    dispatch(
      setProfilePictures({
        status: 'fetching',
      }),
    );
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
    let newProfilePictures: any;
    let newObject = {};
    if (action.payload) {
      newProfilePictures = action.payload.data;
      const normalizeData = newProfilePictures.map(
        ({ id, ...rest }: ProfilePictureI) => ({
          [id]: { ...rest },
        }),
      );
      newObject = Object.assign({}, ...normalizeData);
    }
    dispatch(
      setProfilePictures({
        end: newProfilePictures ? newProfilePictures.length < 20 : true,
        page: getState().profilePictures.page + 1,
        profilePictures: {
          ...getState().profilePictures.profilePictures,
          ...newObject,
        },
        status: 'success',
      }),
    );
    dispatch(setLoader(false));
  }
};

export default [
  errorProfilePictures,
  fetchProfilePictures,
  successProfilePictures,
];
