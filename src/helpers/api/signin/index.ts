import { AxiosResponse } from 'axios';

import client from '#helpers/api/client';

const endpoint = '/users/signin';

interface ValuesI {
  confirmPassword: string;
  email: string;
  password: string;
  userName: string;
}

const signin
: (values: ValuesI) => Promise<AxiosResponse<any>> = async (values: ValuesI) => new Promise((
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
    .then((respone) => resolve(respone))
    .catch((err) => reject(err));
});

export default signin;
