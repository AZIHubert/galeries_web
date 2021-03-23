import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  GALERIES,
  GALERIES_FETCH,
  apiRequest,
  setGaleries,
  setLoader,
  setNotification,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorGaleries: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${GALERIES} ${API_ERROR}`) {
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
    dispatch(
      setGaleries({
        status: 'error',
      }),
    );
    dispatch(setLoader(false));
  }
};

const fetchGaleries: Middleware = (
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
  if (action.type === GALERIES_FETCH && !getState().galeries.end) {
    dispatch(
      setGaleries({
        status: 'fetching',
      }),
    );
    dispatch(
      apiRequest(
        null,
        'GET',
        endPoints.GALERIES,
        GALERIES,
        undefined,
        undefined,
        getState().galeries.page + 1,
      ),
    );
  }
};

const successGaleries: Middleware = (
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
  if (action.type === `${GALERIES} ${API_SUCCESS}`) {
    let newGaleries: any;
    let newObject = {};
    if (action.payload) {
      newGaleries = action.payload.data;
      const normalizeData = newGaleries.map(
        ({ id, ...rest }: GalerieI) => ({
          [id]: { ...rest },
        }),
      );
      newObject = Object.assign({}, ...normalizeData);
    }
    dispatch(
      setGaleries({
        end: newGaleries ? newGaleries.length < 20 : true,
        page: getState().galeries.page + 1,
        galeries: {
          ...getState().galeries.galeries,
          ...newObject,
        },
        status: 'success',
      }),
    );
    dispatch(setLoader(false));
  }
};

export default [
  errorGaleries,
  fetchGaleries,
  successGaleries,
];
