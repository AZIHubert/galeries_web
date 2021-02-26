import { Middleware } from 'redux';

import {
  API_REQUEST,
  apiError,
  apiSuccess,
  setLoader,
} from '#src/store/actions';
import {
  request,
  getAuthToken,
  refreshToken,
} from '#store/helpers';

const apiMiddleware: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  const {
    payload,
  } = action;
  if (action.type.includes(API_REQUEST)) {
    dispatch(setLoader(true));
    refreshToken();
    if (
      payload.meta
      && payload.meta.method
      && payload.meta.url
      && payload.meta.entity
    ) {
      const token = getAuthToken();
      const {
        confirmToken,
        entity,
        method,
        url,
      } = payload.meta;
      request(
        payload.data,
        method,
        url,
        token,
        confirmToken,
      )
        .then((response) => {
          dispatch(
            apiSuccess(
              response.data,
              entity,
            ),
          );
        }).catch((err) => {
          dispatch(
            apiError(
              err.response && err.status !== 500
                ? err.response.data.errors
                : 'Something went wrong. Please try again.',
              entity,
            ),
          );
        });
    }
  }
  return next(action);
};

export default apiMiddleware;
