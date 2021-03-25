import { Middleware } from 'redux';

import {
  API_SUCCESS,
  API_ERROR,
  GALERIE_USERS,
  GALERIE_USERS_FETCH,
  apiRequest,
  setGaleries,
  setLoader,
  setNotification,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorGalerieUsers: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${GALERIE_USERS} ${API_ERROR}`) {
    if (action.payload) {
      dispatch(
        setNotification({
          error: true,
          text: action.payload.data,
        }),
      );
    } else {
      dispatch(
        setNotification({
          error: true,
          text: 'Something went wrong',
        }),
      );
    }
    dispatch(setLoader(false));
  }
};

const fetchGalerieUsers: Middleware = (
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
  if (action.type === GALERIE_USERS_FETCH) {
    if (action.payload) {
      const galerieId = action.payload.data.id;
      const galerieToFetchUser = getState().galeries.galeries[galerieId];
      if (!galerieToFetchUser) {
        dispatch(
          setNotification({
            error: true,
            text: 'Failed to fetch users. Galerie not found',
          }),
        );
      } else {
        dispatch(
          apiRequest(
            null,
            'GET',
            endPoints.GALERIES_USER(galerieId),
            GALERIE_USERS,
          ),
        );
      }
    }
  }
};

const successGalerieUser: Middleware = (
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
  if (action.type === `${GALERIE_USERS} ${API_SUCCESS}`) {
    if (action.payload) {
      const { id: galerieId } = action.payload.data;
      const galerieToFetchUser = getState().galeries.galeries[galerieId];
      if (!galerieToFetchUser) {
        dispatch(
          setNotification({
            error: true,
            text: 'Failed to fetch users. Galerie not found',
          }),
        );
      } else {
        dispatch(
          setGaleries({
            galeries: {
              ...getState().galeries.galeries,
              [galerieId]: {
                ...galerieToFetchUser,
                users: action.payload.data.users,
              },
            },
          }),
        );
      }
    }
    dispatch(setLoader(false));
  }
};

export default [
  errorGalerieUsers,
  fetchGalerieUsers,
  successGalerieUser,
];
