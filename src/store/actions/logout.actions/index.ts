export const LOGOUT = '[LOGOUT]';

export const LOGOUT_FETCH = `${LOGOUT} Fetch`;

export const fetchLogout: () => store.ActionI = () => ({
  payload: {
    data: null,
  },
  type: LOGOUT_FETCH,
});
