import moment from 'moment';
import { Middleware } from 'redux';

import { endPoints, localStorages } from '#store/constant';
import { apiError, apiSuccess, API_REQUEST } from '#src/store/actions';
import client from '#store/client';

const apiMiddleware: Middleware = (
  { dispatch },
) => (
  next,
) => (
  action: store.ActionI,
) => {
  if (action.type.includes(API_REQUEST)) {
    const token = localStorage.getItem(localStorages.AUTH_TOKEN);
    const expiresIn = localStorage.getItem(localStorages.EXPIRES_DATE_TOKEN);
    if (token && expiresIn) {
      const isExpired = moment().isAfter(JSON.parse(expiresIn));
      if (isExpired) {
        client({
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
          },
          method: 'GET',
          url: endPoints.REFRESH_TOKEN,
        }).then((response) => {
          localStorage.setItem(
            localStorages.AUTH_TOKEN,
            response.data.token,
          );
          localStorage.setItem(
            localStorages.EXPIRES_DATE_TOKEN,
            JSON.stringify(moment().add(response.data.expiresIn, 's').valueOf()),
          );
        }).catch(() => localStorage.clear());
      }
    }
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
        data: payload.data,
        headers: {
          authorization: token,
          'Content-Type': 'application/json',
          confirmation: confirmToken,
        },
        method,
        url,
      }).then((response) => {
        dispatch(
          apiSuccess(
            response.data,
            entity,
            payload.meta && payload.meta.callback ? payload.meta.callback : undefined,
          ),
        );
      }).catch((err) => dispatch(apiError(err, entity)));
    }
  }
  return next(action);
};

export default [apiMiddleware];
