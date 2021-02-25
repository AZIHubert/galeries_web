export const LOGIN_GOOGLE = '[GOOGLE LOGIN]';

export const LOGIN_GOOGLE_FETCH = `${LOGIN_GOOGLE} Fetch`;

interface DataI {
  email: string,
  id: string,
  imageUrl: string,
  name: string,
}

export const fetchLoginGoogle: (
  data: DataI,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: LOGIN_GOOGLE_FETCH,
});
