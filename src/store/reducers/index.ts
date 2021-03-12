import { combineReducers } from 'redux';

import account from './account.reducer';
import login from './login.reducer';
import notification from './notification.reducer';
import profilePicture from './profilePicture.reducer';
import profilePictures from './profilePictures.reducer';
import pseudonym from './pseudonym.reducer';
import resetPassword from './resetPassword.reducer';
import sendConfirmation from './sendConfirmation.reducer';
import sendResetPassword from './sendResetPassword.reducer';
import sendTicket from './sendTicket.reducer';
import signin from './signin.reducer';
import updateEmail from './updateEmail.reducer';
import updateEmailConfirm from './updateEmailConfirm.reducer';
import updateEmailValidate from './updateEmailValidate.reducer';
import updatePassword from './updatePassword.reducer';
import user from './user.reducer';
import ui from './ui.reducer';

export default combineReducers({
  account,
  login,
  notification,
  profilePicture,
  profilePictures,
  pseudonym,
  resetPassword,
  sendConfirmation,
  sendResetPassword,
  sendTicket,
  signin,
  updateEmail,
  updateEmailConfirm,
  updateEmailValidate,
  updatePassword,
  ui,
  user,
});
