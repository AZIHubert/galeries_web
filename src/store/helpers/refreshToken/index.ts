import moment from 'moment';

import { endPoints } from '#store/constant';

import {
  getAuthToken,
  getExpiresToken,
  request,
  setAuthToken,
  setExpiresToken,
} from '#store/helpers';

export default async () => {
  const token = getAuthToken();
  const expiresIn = getExpiresToken();
  if (token && expiresIn) {
    const isExpired = moment().isAfter(JSON.parse(expiresIn));
    if (isExpired) {
      try {
        const response = await request(
          null,
          'GET',
          endPoints.REFRESH_TOKEN,
          token,
        );
        setAuthToken(response.data.token);
        setExpiresToken(response.data.expiresIn);
      } catch (err) {
        localStorage.clear();
      }
    }
  }
};
