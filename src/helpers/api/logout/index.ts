import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/logout';

const login: () => Promise<AxiosResponse<any>> = () => new Promise((
  resolve,
  reject,
) => {
  client({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: endpoint,
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export default login;
