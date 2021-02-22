export const USER = '[User]';

export const USER_FETCH = `${USER} fetch`;
export const USER_SET = `${USER} set`;

export const fetchUser = (query?: any) => ({
  type: USER_FETCH,
  payload: {
    data: query,
  },
});

export const setUser = (
  data: UserI | null,
) => ({
  type: USER_SET,
  payload: {
    data,
  },
});
