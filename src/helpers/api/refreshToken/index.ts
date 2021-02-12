import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/refreshToken';

const getMe: () => Promise<AxiosResponse<any>> = () => new Promise((
  resolve,
  reject,
) => {
  client({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    url: endpoint,
    withCredentials: true,
  })
    .then((response) => resolve(response))
    .catch((err) => reject(err));
});

export default getMe;
