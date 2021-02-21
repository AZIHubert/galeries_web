export const SEND_RESET_PASSWORD = '[SEND RESET PASSWORD]';

export const SEND_RESET_PASSWORD_ERROR = `${SEND_RESET_PASSWORD} error`;
export const SEND_RESET_PASSWORD_FETCH = `${SEND_RESET_PASSWORD} fetch`;

interface DataI {
  email: string;
}

export const fetchSendResetPassword = (data: DataI) => ({
  type: SEND_RESET_PASSWORD_FETCH,
  payload: {
    data,
  },
});

export const setResetPasswordError = (data: DataI) => ({
  type: SEND_RESET_PASSWORD_ERROR,
  payload: {
    data,
  },
});
