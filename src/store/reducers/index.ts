import { combineReducers } from 'redux';

import login from './login.reducer'; // loginError
import notification from './notification.reducer';
import sendConfirmation from './sendConfirmation.reducer'; // sendConfirmationError
import sendResetPassword from './sendResetPassword.reducer'; // sendResetPasswordError
import signin from './signin.reducer'; // SigninError
import user from './user.reducer';
import ui from './ui.reducer';

export default combineReducers({
  login,
  notification,
  sendConfirmation,
  sendResetPassword,
  signin,
  ui,
  user,
});
