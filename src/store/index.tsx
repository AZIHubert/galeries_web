import { applyMiddleware, createStore, compose } from 'redux';
import reducers from './reducers';
import { appMiddleware, coreMiddleware } from './middlewares';

export default createStore(
  reducers,
  compose(
    applyMiddleware(...appMiddleware, ...coreMiddleware),
  ),
);
