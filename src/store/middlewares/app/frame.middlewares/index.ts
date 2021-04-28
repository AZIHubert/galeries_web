import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  FRAME,
  FRAME_POST,
  apiRequest,
  setFrame,
  setGaleries,
  setLoader,
  setNotification,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorFrame: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${FRAME} ${API_ERROR}`) {
    if (action.payload) {
      dispatch(
        setFrame({
          status: 'error',
        }),
      );
      dispatch(
        setNotification({
          error: true,
          text: action.payload.data,
        }),
      );
    } else {
      dispatch(
        setFrame({
          status: 'error',
        }),
      );
      dispatch(
        setNotification({
          error: true,
          text: 'Something went wrong.',
        }),
      );
    }
    dispatch(setLoader(false));
  }
};

const postFrame: Middleware = (
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
  if (action.type === FRAME_POST) {
    if (action.payload) {
      dispatch(
        setGaleries({
          galeries: {
            ...getState().galeries.galeries,
            [action.payload.data.galerieId]: {
              ...getState()
                .galeries
                .galeries[action.payload.data.galerieId],
              frames: {
                ...getState()
                  .galeries
                  .galeries[action.payload.data.galerieId]
                  .frames,
                status: 'posting',
              },
            },
          },
        }),
      );
    }
    dispatch(
      apiRequest(
        action.payload ? action.payload.data.images : undefined,
        'POST',
        endPoints.GALERIES_FRAMES(action.payload ? action.payload.data.galerieId : undefined),
        FRAME,
        'application/json',
      ),
    );
  }
};

const successFrame: Middleware = (
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
  if (action.type === `${FRAME} ${API_SUCCESS}`) {
    if (action.payload) {
      if (action.payload.data.type === 'POST') {
        const { frame, galerieId } = action.payload.data;
        const currentGalerie = getState().galeries.galeries[galerieId];
        const normalizeData = {
          [frame.id]: {
            ...frame,
            likes: [],
          },
        };
        dispatch(
          setGaleries({
            galeries: {
              ...getState().galeries.galeries,
              [galerieId]: {
                ...currentGalerie,
                frames: {
                  ...currentGalerie.frames,
                  frames: {
                    ...currentGalerie.frames.frames,
                    ...normalizeData,
                  },
                  status: 'success',
                },
              },
            },
          }),
        );
      }
      dispatch(setLoader(false));
    }
  }
};

export default [
  errorFrame,
  postFrame,
  successFrame,
];
