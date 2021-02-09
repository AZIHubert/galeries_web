import { AxiosResponse } from 'axios';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';

import client from '#helpers/api/client';

const endpoint = '/users/auth/facebook';

const signin: (
  values: ReactFacebookLoginInfo | ReactFacebookFailureResponse
) =>Promise<AxiosResponse<any>> = async (
  values: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
) => new Promise((
  resolve,
  reject,
) => {
  client({
    data: values,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: endpoint,
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export default signin;
