export const RESET_PASSWORD = '[RESET PASSWORD]';

export const RESET_PASSWORD_SET_ERRORS = `${RESET_PASSWORD} set error`;
export const RESET_PASSWORD_FETCH = `${RESET_PASSWORD} fetch`;

interface FetchDataI {
  confirmPassword: string;
  confirmationToken: string;
  password: string;
}

interface ErrorDataI {
  confirmPassword: string;
  password: string;
}

export const fetchResetPassword = (
  data: FetchDataI,
) => ({
  type: RESET_PASSWORD_FETCH,
  payload: {
    data,
  },
});

export const setResetPasswordError = (
  data: ErrorDataI,
) => ({
  type: RESET_PASSWORD_SET_ERRORS,
  payload: {
    data,
  },
});
