import apiMiddleware from './api.middlewares';
import refreshTokenMiddleware from './refreshToken.middlewares';

export default [
  ...apiMiddleware,
  ...refreshTokenMiddleware,
];
