import { combineReducers } from 'redux';

import login from './login.reducer';
import notification from './notification.reducer';
import resetPassword from './resetPassword.reducer';
import sendConfirmation from './sendConfirmation.reducer';
import sendResetPassword from './sendResetPassword.reducer';
import sendTicket from './sendTicket.reducer';
import signin from './signin.reducer';
import user from './user.reducer';
import ui from './ui.reducer';

export default combineReducers({
  login,
  notification,
  resetPassword,
  sendConfirmation,
  sendResetPassword,
  sendTicket,
  signin,
  ui,
  user,
});
