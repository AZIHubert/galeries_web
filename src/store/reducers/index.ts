import { combineReducers } from 'redux';

import login from './login.reducer';
import notification from './notification.reducer';
import profilePicture from './profilePicture.reducer';
import profilePictures from './profilePictures.reducer';
import resetPassword from './resetPassword.reducer';
import sendConfirmation from './sendConfirmation.reducer';
import sendResetPassword from './sendResetPassword.reducer';
import sendTicket from './sendTicket.reducer';
import signin from './signin.reducer';
import updatePassword from './updatePassword.reducer';
import user from './user.reducer';
import ui from './ui.reducer';

export default combineReducers({
  login,
  notification,
  profilePicture,
  profilePictures,
  resetPassword,
  sendConfirmation,
  sendResetPassword,
  sendTicket,
  signin,
  updatePassword,
  ui,
  user,
});
