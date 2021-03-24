import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  GALERIE,
  GALERIE_FETCH,
  GALERIE_POST,
  apiRequest,
  setGalerie,
  setGaleries,
  setLoader,
  setNotification,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorGalerie: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${GALERIE} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setGalerie({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(
          setGalerie({
            status: 'error',
          }),
        );
        dispatch(
          setNotification({
            error: true,
            text: action.payload.data,
          }),
        );
      }
    } else {
      dispatch(
        setGalerie({
          status: 'error',
        }),
      );
      dispatch(
        setNotification({
          error: true,
          text: 'Something went wrong',
        }),
      );
    }
    dispatch(
      setLoader(false),
    );
  }
};

const fetchGalerie: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === GALERIE_FETCH) {
    dispatch(
      setGalerie({
        status: 'fetching',
      }),
    );
    dispatch(
      apiRequest(
        null,
        'GET',
        endPoints.GALERIES,
        GALERIE,
        undefined,
        undefined,
        undefined,
        action.payload ? action.payload.data.id : undefined,
      ),
    );
  }
};

const postGalerie: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === GALERIE_POST) {
    dispatch(
      setGalerie({
        status: 'posting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'POST',
        endPoints.GALERIES,
        GALERIE,
      ),
    );
  }
};

const successGalerie: Middleware = (
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
  if (action.type === `${GALERIE} ${API_SUCCESS}`) {
    if (action.payload) {
      if (action.payload.data.type === 'POST') {
        const { galerie } = action.payload.data;
        dispatch(
          setGaleries({
            galeries: {
              [galerie.id]: galerie,
              ...getState().galeries.galeries,
            },
          }),
        );
      }
      if (action.payload.data.type === 'GET') {
        const { galerie } = action.payload.data;
        dispatch(
          setGaleries({
            galeries: {
              [galerie.id]: galerie,
              ...getState().galeries.galeries,
            },
          }),
        );
      }
    }
    dispatch(
      setGalerie({
        status: 'success',
      }),
    );

    dispatch(setLoader(false));
  }
};

export default [
  errorGalerie,
  fetchGalerie,
  postGalerie,
  successGalerie,
];
