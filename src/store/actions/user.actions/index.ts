export const USER = '[User]';

export const FETCH_USER = `${USER} Fetch`;
export const SET_USER = `${USER} Set`;

export const fetchUser = (query: any) => ({
  type: FETCH_USER,
  payload: {
    data: query,
  },
});

export const setUser = (
  user: UserI,
) => ({
  type: SET_USER,
  payload: {
    data: user,
  },
});
