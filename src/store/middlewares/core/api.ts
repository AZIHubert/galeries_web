import { } from 'axios';

import { Middleware } from 'redux';
import { apiError, apiSuccess, API_REQUEST } from '#src/store/actions';
import client from '#store/client';

const apiMiddleware: Middleware = ({ dispatch }) => (next) => (action: ActionApiI) => {
  next(action);
  if (action.type.includes(API_REQUEST)) {
    const token = localStorage.getItem('authToken');
    const { entity, method, url } = action.payload.meta;
    client({
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      method,
      url,
    })
      .then((data) => dispatch(apiSuccess(data, entity)))
      .catch((err) => dispatch(apiError(err, entity)));
  }
};

export default apiMiddleware;
