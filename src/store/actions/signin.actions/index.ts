export const SIGNIN = '[SIGNIN]';

export const SIGNIN_FETCH = `${SIGNIN} Fetch`;
export const SIGNIN_SET = `${SIGNIN} Set`;

export const fetchSignin: (
  data: form.SigninI
) => store.ActionI = (
  data,
) => ({
  type: SIGNIN_FETCH,
  payload: { data },
});

export const resetSignin: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        confirmPassword: '',
        email: '',
        password: '',
        userName: '',
      },
      status: 'pending',
    },
  },
  type: SIGNIN_SET,
});

export const setSignin: (
  data: {
    errors?: form.SigninI
    status?: store.Status;
  },
) => store.ActionI = (
  data,
) => ({
  type: SIGNIN_SET,
  payload: { data },
});
