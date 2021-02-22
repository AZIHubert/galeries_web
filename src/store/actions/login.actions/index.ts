export const LOGIN = '[LOGIN]';

export const LOGIN_SET = `${LOGIN} set`;
export const LOGIN_FETCH = `${LOGIN} Fetch`;

export const setLogin = (data: {
  status?: store.FormStatus;
  errors?: LoginI;
}) => ({
  type: LOGIN_SET,
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
