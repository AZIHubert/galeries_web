export const SIGNIN = '[SIGNIN]';

export const SIGNIN_SET = `${SIGNIN} set`;
export const SIGNIN_FETCH = `${SIGNIN} fetch`;

export const setSignin = (data: any) => ({
  type: SIGNIN_SET,
  payload: {
    data,
  },
});

export const fetchSignin = (data: SigninI) => ({
  type: SIGNIN_FETCH,
  payload: {
    data,
  },
});
