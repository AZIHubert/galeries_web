export const USER = '[User]';

export const USER_FETCH = `${USER} Fetch`;
export const USER_SET = `${USER} Set`;

export const fetchUser: (
  query?: any
) => store.ActionI = (
  query?,
) => ({
  payload: { data: query },
  type: USER_FETCH,
});

export const setUser: (
  data: UserI | null,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: USER_SET,
});
