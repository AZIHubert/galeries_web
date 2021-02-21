export const SIGNIN = '[SIGNIN]';

export const SIGNIN_ERROR = `${SIGNIN} error`;
export const SIGNIN_FETCH = `${SIGNIN} fetch`;

export const setSigninError = (data: SigninI) => ({
  type: SIGNIN_ERROR,
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
