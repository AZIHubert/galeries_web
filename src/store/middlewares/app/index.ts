import accountMiddlewares from './account.middlewares';
import confirmationMiddleware from './confirmation.middlewares';
import initUserMiddleware from './initUser.middlewares';
import loginFacebookMiddlewares from './loginFacebook.middlewares';
import loginGoogleMiddlewares from './loginGoogle.middlewares';
import loginMiddlewares from './login.middlewares';
import logoutMiddlewares from './logout.middlewares';
import profilePictureMiddlewares from './profilePicture.middlewares';
import profilePicturesMiddlewares from './profilePictures.middlewares';
import pseudonymMiddlewares from './pseudonym.middlewares';
import resetPasswordMiddlewares from './resetPassword.middlewares';
import sendConfirmationMiddlewares from './sendConfirmation.middlewares';
import sendResetPasswordMiddlewares from './sendResetPassword.middlewares';
import sendTicketMiddlewares from './sendTicket.middlewares';
import signinMiddlewares from './signin.middlewares';
import updateEmailConfirmMiddlewares from './updateEmailConfirm.middlewares';
import updateEmailMiddlewares from './updateEmail.middlewares';
import updateEmailValidateMiddleware from './updateEmailValidate.middlewares';
import updatePasswordMiddlewares from './updatePassword.middlewares';
import userMiddlewares from './user.middlewares';

export default [
  ...accountMiddlewares,
  ...confirmationMiddleware,
  ...initUserMiddleware,
  ...loginFacebookMiddlewares,
  ...loginGoogleMiddlewares,
  ...loginMiddlewares,
  ...logoutMiddlewares,
  ...profilePictureMiddlewares,
  ...profilePicturesMiddlewares,
  ...pseudonymMiddlewares,
  ...resetPasswordMiddlewares,
  ...signinMiddlewares,
  ...sendConfirmationMiddlewares,
  ...sendResetPasswordMiddlewares,
  ...sendTicketMiddlewares,
  ...updateEmailConfirmMiddlewares,
  ...updateEmailMiddlewares,
  ...updateEmailValidateMiddleware,
  ...updatePasswordMiddlewares,
  ...userMiddlewares,
];
