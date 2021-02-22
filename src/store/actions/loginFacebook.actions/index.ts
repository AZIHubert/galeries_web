import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';

export const LOGIN_FACEBOOK = '[FACEBOOK LOGIN]';

export const LOGIN_FACEBOOK_FETCH = `${LOGIN_FACEBOOK} fetch`;

export const fetchLoginFacebook = (
  data: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
) => ({
  type: LOGIN_FACEBOOK_FETCH,
  payload: {
    data,
  },
});
