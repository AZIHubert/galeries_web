import { AxiosResponse, CancelTokenSource } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/me';

interface GetMeI {
  source: CancelTokenSource;
}

const getMe: ({
  source,
}: GetMeI) => Promise<AxiosResponse<any>> = ({
  source,
}: GetMeI) => new Promise((
  resolve,
  reject,
) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    client({
      cancelToken: source.token,
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
