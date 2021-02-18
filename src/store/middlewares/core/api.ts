import { Middleware } from 'redux';
import { apiError, apiSuccess, API_REQUEST } from '#src/store/actions';

const apiMiddleware: Middleware = ({ dispatch }) => (next) => (action: ActionApiI) => {
  next(action);
  if (action.type === API_REQUEST) {
    const { entity, method, url } = action.payload.meta;
    fetch(url, { method })
      .then((res) => res.json())
      .then((data) => dispatch(apiSuccess(data, entity)))
      .catch((err) => dispatch(apiError(err, entity)));
  }
};

export default apiMiddleware;
