import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import uiReducer from './ui.reducer';
import notificationReducer from './notification.reducer';

export default combineReducers({
  notification: notificationReducer,
  ui: uiReducer,
  user: userReducer,
});
