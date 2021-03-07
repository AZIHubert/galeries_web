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
) => async (
  action: store.ActionI,
) => {
  const {
    payload,
  } = action;
  if (action.type.includes(API_REQUEST)) {
    dispatch(setLoader(true));
    await refreshToken();
    if (
      payload
      && payload.meta
      && payload.meta.method
      && payload.meta.url
      && payload.meta.entity
    ) {
      const token = getAuthToken();
      const {
        confirmToken,
        contentType,
        entity,
        method,
        url,
        page,
        params,
      } = payload.meta;
      request(
        payload.data,
        method,
        url,
        token,
        confirmToken,
        contentType,
        page,
        params,
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
