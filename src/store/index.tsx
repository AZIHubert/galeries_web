import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { appMiddleware, coreMiddleware } from './middlewares';
import reducers from './reducers';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(...appMiddleware, ...coreMiddleware),
);

export default createStore(
  reducers,
  composedEnhancer,
);
