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

export const setSignin: (
  data: {
    errors?: form.SigninI
    status?: store.FormStatus;
  },
) => store.ActionI = (
  data,
) => ({
  type: SIGNIN_SET,
  payload: { data },
});
