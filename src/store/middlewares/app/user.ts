import { Middleware } from 'redux';

import {
  API_ERROR,
  API_SUCCESS,
  FETCH_USER,
  USER,
  apiRequest,
  setLoader,
  setNotification,
  setUser,
} from '#store/actions';

import { GET_ME } from '#store/constant';

const userMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case FETCH_USER:
      dispatch(apiRequest(null, 'get', GET_ME, USER));
      dispatch(setLoader(true));
      break;
    case `${USER} ${API_SUCCESS}`:
      dispatch(setUser(action.payload));
      dispatch(setLoader(false));
      break;
    case `${USER} ${API_ERROR}`:
      dispatch(setLoader(false));
      dispatch(setNotification(action.payload, USER));
      break;
    default:
      dispatch(setLoader(false));
      dispatch(setNotification('Switch reach default', USER));
  }
};

export default userMiddleware;
