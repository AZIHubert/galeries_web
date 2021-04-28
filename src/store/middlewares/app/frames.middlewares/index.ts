import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  FRAMES,
  FRAMES_FETCH,
  apiRequest,
  setGaleries,
  setLoader,
  setNotification,
} from '#store/actions';

import { endPoints } from '#store/constant';

const errorFrames: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${FRAMES} ${API_ERROR}`) {
    dispatch(
      setNotification({
        error: true,
        text: action.payload ? action.payload.data : 'Something went wrong.',
      }),
    );
    dispatch(setLoader(false));
  }
};

const fetchFrames: Middleware = (
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
  if (action.type === FRAMES_FETCH) {
    if (
      action.payload
      && getState()
        .galeries
        .galeries[action.payload.data.galerieId]
      && !getState()
        .galeries
        .galeries[action.payload.data.galerieId]
        .frames
        .end
    ) {
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
                status: 'fetching',
              },
            },
          },
        }),
      );
      dispatch(
        apiRequest(
          null,
          'GET',
          endPoints.GALERIES_FRAMES(action.payload.data.galerieId),
          FRAMES,
          undefined,
          undefined,
          getState()
            .galeries
            .galeries[action.payload.data.galerieId]
            .frames
            .page + 1,
        ),
      );
    }
  }
};

const successFrames: Middleware = (
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
  if (action.type === `${FRAMES} ${API_SUCCESS}`) {
    let newFrames: any;
    let newObject = {};
    if (
      action.payload
      && getState().galeries.galeries[action.payload.data.galerieId]
    ) {
      newFrames = action.payload.data.frames;
      const normalizeData = newFrames.map(
        (frame: FrameI) => ({
          [frame.id]: { ...frame },
        }),
      );
      newObject = Object.assign({}, ...normalizeData);
      dispatch(
        setGaleries({
          galeries: {
            ...getState().galeries.galeries,
            [action.payload.data.galerieId]: {
              ...getState()
                .galeries
                .galeries[action.payload.data.galerieId],
              frames: {
                end: newFrames ? newFrames.length < 20 : true,
                page: getState()
                  .galeries
                  .galeries[action.payload.data.galerieId]
                  .frames.page + 1,
                frames: {
                  ...getState()
                    .galeries
                    .galeries[action.payload.data.galerieId]
                    .frames
                    .frames,
                  ...newObject,
                },
                status: 'success',
              },
            },
          },
        }),
      );
    } else {
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

export default [
  errorFrames,
  fetchFrames,
  successFrames,
];
