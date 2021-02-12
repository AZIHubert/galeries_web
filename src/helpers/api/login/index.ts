import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/login';

interface ValuesI {
  password: string;
  userNameOrEmail: string;
}

const login: (
  values: ValuesI
) => Promise<AxiosResponse<any>> = (
  values: ValuesI,
) => new Promise((
  resolve,
  reject,
) => {
  client({
    data: values,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: endpoint,
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export default login;
