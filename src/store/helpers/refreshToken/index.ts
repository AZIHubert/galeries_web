import moment from 'moment';

import { endPoints } from '#store/constant';

import {
  getAuthToken,
  getExpiresToken,
  request,
  setAuthToken,
  setExpiresToken,
} from '#store/helpers';

export default () => {
  const token = getAuthToken();
  const expiresIn = getExpiresToken();
  if (token && expiresIn) {
    const isExpired = moment().isAfter(JSON.parse(expiresIn));
    if (isExpired) {
      request(
        null,
        'GET',
        endPoints.REFRESH_TOKEN,
        token,
      )
        .then((response) => {
          setAuthToken(response.data.token);
          setExpiresToken(response.data.expiresIn);
        }).catch(() => {
          localStorage.clear();
        });
    }
  }
};
