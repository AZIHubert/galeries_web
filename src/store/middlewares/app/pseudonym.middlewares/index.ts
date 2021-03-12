import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  PSEUDONYM,
  PSEUDONYM_PUT,
  apiRequest,
  setLoader,
  setNotification,
  setPseudonym,
  setUser,
} from '#store/actions';

import {
  endPoints,
} from '#store/constant';

const errorPseudonym: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PSEUDONYM} ${API_ERROR}`) {
    if (action.payload) {
      if (typeof action.payload.data === 'object') {
        dispatch(
          setPseudonym({
            errors: action.payload.data,
            status: 'error',
          }),
        );
      } else {
        dispatch(
          setPseudonym({
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
        setPseudonym({
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

const putPseudonym: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === PSEUDONYM_PUT) {
    dispatch(
      setPseudonym({
        status: 'putting',
      }),
    );
    dispatch(
      apiRequest(
        action.payload ? action.payload.data : undefined,
        'PUT',
        endPoints.PSEUDONYM,
        PSEUDONYM,
      ),
    );
  }
};

const successPseudonym: Middleware = (
  { dispatch, getState },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  next(action);
  if (action.type === `${PSEUDONYM} ${API_SUCCESS}`) {
    if (action.payload) {
      const { user } = getState();
      if (user) {
        dispatch(
          setUser({
            ...user,
            pseudonym: action.payload.data.pseudonym,
          }),
        );
      }
    }
    dispatch(
      setPseudonym({
        status: 'success',
      }),
    );
    dispatch(
      setLoader(false),
    );
  }
};

export default [
  errorPseudonym,
  putPseudonym,
  successPseudonym,
];
