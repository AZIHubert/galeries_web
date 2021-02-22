import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { appMiddleware, coreMiddleware } from './middlewares';
import reducers from './reducers';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(...coreMiddleware, ...appMiddleware),
);

export default createStore(
  reducers,
  composedEnhancer,
);
