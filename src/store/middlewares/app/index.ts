import confirmationMiddleware from './confirmation.middlewares';
import loginFacebookMiddlewares from './loginFacebook.middlewares';
import loginGoogleMiddlewares from './loginGoogle.middlewares';
import loginMiddlewares from './login.middlewares';
import logoutMiddlewares from './logout.middlewares';
import profilePictureMiddlewares from './profilePicture.middlewares';
import resetPasswordMiddlewares from './resetPassword.middlewares';
import sendConfirmationMiddlewares from './sendConfirmation.middlewares';
import sendResetPasswordMiddlewares from './sendResetPassword.middlewares';
import sendTicketMiddlewares from './sendTicket.middlewares';
import signinMiddlewares from './signin.middlewares';
import userMiddlewares from './user.middlewares';

export default [
  ...confirmationMiddleware,
  ...loginFacebookMiddlewares,
  ...loginGoogleMiddlewares,
  ...loginMiddlewares,
  ...logoutMiddlewares,
  ...profilePictureMiddlewares,
  ...resetPasswordMiddlewares,
  ...signinMiddlewares,
  ...sendConfirmationMiddlewares,
  ...sendResetPasswordMiddlewares,
  ...sendTicketMiddlewares,
  ...userMiddlewares,
];
