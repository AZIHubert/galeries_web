import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/confirmation';

const confirmation: (
  token: string
) => Promise<AxiosResponse<any>> = (
  token: string,
) => new Promise((
  resolve,
  reject,
) => {
  client({
    headers: {
      'Access-Control-Allow-Origin': '*',
      confirmation: token,
      'Content-Type': 'application/json',
    },
    method: 'put',
    url: endpoint,
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export default confirmation;
