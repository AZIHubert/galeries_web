import apiMiddleware from './api';
import refreshTokenMiddleware from './refreshtoken';

export default [
  apiMiddleware,
  ...refreshTokenMiddleware,
];
