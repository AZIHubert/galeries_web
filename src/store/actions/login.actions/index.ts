export const LOGIN = '[LOGIN]';

export const LOGIN_FETCH = `${LOGIN} Fetch`;
export const LOGIN_SET = `${LOGIN} Set`;

export const fetchLogin: (
  data: form.LoginI,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: LOGIN_FETCH,
});

export const resetLogin: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        password: '',
        userNameOrEmail: '',
      },
      status: 'pending',
    },
  },
  type: LOGIN_SET,
});

export const setLogin: (
  data: {
    errors?: form.LoginI;
    status?: store.Status;
  },
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: LOGIN_SET,
});
