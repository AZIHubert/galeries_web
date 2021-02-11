import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/resetPassword';

interface ValuesI {
  confirmPassword: string;
  password: string;
}

const confirmation
: (
  token: string,
  values: ValuesI
) => Promise<AxiosResponse<any>> = (
  token: string,
  values: ValuesI,
) => new Promise((
  resolve,
  reject,
) => {
  client({
    data: values,
    headers: {
      'Access-Control-Allow-Origin': '*',
      confirmation: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'put',
    url: endpoint,
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export default confirmation;
