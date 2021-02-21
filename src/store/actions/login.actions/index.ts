export const LOGIN = '[LOGIN]';

export const LOGIN_ERROR = `${LOGIN} error`;
export const LOGIN_FETCH = `${LOGIN} Fetch`;

export const setLoginError = (data: LoginI) => ({
  type: LOGIN_ERROR,
  payload: {
    data,
  },
});

export const fetchLogin = (data: LoginI) => ({
  type: LOGIN_FETCH,
  payload: {
    data,
  },
});
