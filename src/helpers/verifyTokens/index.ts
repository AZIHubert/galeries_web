import moment from 'moment';
import { refreshToken } from '#helpers/api';

const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  const expiresIn = localStorage.getItem('expiresIn');
  if (token && expiresIn) {
    const expiresAt = JSON.parse(expiresIn);
    const isExpired = moment().isAfter(moment(expiresAt));
    if (isExpired) {
      try {
        const response = await refreshToken();
        const tokenRefresh = response.data.token;
        const expiresInRefresh = moment().add(response.data.expiresIn);
        localStorage.setItem('authToken', tokenRefresh);
        localStorage.setItem('expiresIn', JSON.stringify(expiresInRefresh.valueOf()));
      } catch (err) {
        localStorage.clear();
        throw new Error(err);
      }
    }
  }
};

export default verifyToken;
