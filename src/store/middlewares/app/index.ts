import confirmationMiddleware from './confirmation.middlewares';
import loginMiddlewares from './login.middlewares';
import loginFacebookMiddlewares from './loginFacebook.middlewares';
import loginGoogleMiddlewares from './loginGoogle.middlewares';
import logoutMiddlewares from './logout.middlewares';
import resetPasswordMiddlewares from './resetPassword.middlewares';
import sendConfirmationMiddlewares from './sendConfirmation.middlewares';
import sendResetPasswordMiddlewares from './sendResetPassword.middlewares';
import signinMiddlewares from './signin.middlewares';
import userMiddlewares from './user.middlewares';

export default [
  ...confirmationMiddleware,
  ...loginMiddlewares,
  ...loginFacebookMiddlewares,
  ...loginGoogleMiddlewares,
  ...logoutMiddlewares,
  ...resetPasswordMiddlewares,
  ...signinMiddlewares,
  ...sendConfirmationMiddlewares,
  ...sendResetPasswordMiddlewares,
  ...userMiddlewares,
];
