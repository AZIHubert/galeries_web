import { AxiosError } from 'axios';
import { Middleware } from 'redux';

import { localStorages } from '#store/constant';
import { apiError, apiSuccess, API_REQUEST } from '#src/store/actions';
import client from '#store/client';

const apiMiddleware: Middleware = ({ dispatch }) => (next) => (action: store.ActionI) => {
  next(action);
  if (action.type.includes(API_REQUEST)) {
    const token = localStorage.getItem(localStorages.AUTH_TOKEN);
    const { payload } = action;
    if (
      payload.meta
      && payload.meta.method
      && payload.meta.url
      && payload.meta.entity
    ) {
      const {
        confirmToken,
        entity,
        method,
        url,
      } = payload.meta;
      client({
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
          confirmation: confirmToken,
        },
        method,
        url,
      })
        .then((data) => dispatch(apiSuccess(data, entity)))
        .catch((err: AxiosError) => dispatch(apiError(err, entity)));
    }
  }
};

export default [apiMiddleware];
