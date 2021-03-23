import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  GALERIE,
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
      const {
        id,
        ...rest
      }: GalerieI = action.payload.data;
      dispatch(
        setGaleries({
          galeries: {
            [id]: { ...rest },
            ...getState().galeries.galeries,
          },
        }),
      );
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
  postGalerie,
  successGalerie,
];
