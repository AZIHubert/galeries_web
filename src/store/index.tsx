import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { appMiddleware, coreMiddleware } from './middlewares';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(...appMiddleware, ...coreMiddleware),
  // other store enhancers if any
);

export default createStore(
  reducers,
  composedEnhancer,
);
