import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/me';

const getMe: () => Promise<AxiosResponse<any>> = () => new Promise((
  resolve,
  reject,
) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    client({
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
      method: 'get',
      url: endpoint,
    })
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  } else {
    reject(new Error('no token found'));
  }
});

export default getMe;
