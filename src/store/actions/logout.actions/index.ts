export const LOGOUT = '[LOGOUT]';

export const LOGOUT_FETCH = `${LOGOUT} fetch`;

export const fetchLogout = () => ({
  type: LOGOUT_FETCH,
});
