import {
  ReactFacebookLoginInfo,
  ReactFacebookFailureResponse,
} from 'react-facebook-login';

export const LOGIN_FACEBOOK = '[FACEBOOK LOGIN]';

export const LOGIN_FACEBOOK_FETCH = `${LOGIN_FACEBOOK} Fetch`;

export const fetchLoginFacebook: (
  data: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: LOGIN_FACEBOOK_FETCH,
});
