export const LOGIN_GOOGLE = '[GOOGLE LOGIN]';

export const LOGIN_GOOGLE_FETCH = `${LOGIN_GOOGLE} fetch`;

interface DataI {
  email: string,
  id: string,
  imageUrl: string,
  name: string,
}

export const fetchLoginGoogle = (
  data: DataI,
) => ({
  type: LOGIN_GOOGLE_FETCH,
  payload: {
    data,
  },
});
