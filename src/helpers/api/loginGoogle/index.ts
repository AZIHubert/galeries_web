import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/auth/google';

const googleLogin
: (values: any) => Promise<AxiosResponse<any>> = (
  values: any,
) => new Promise((resolve, reject) => {
  const data = {
    id: values.googleId,
    email: values.email,
    imageUrl: values.photoUrl,
    name: values.name,
  };
  client({
    data,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: endpoint,
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export default googleLogin;
