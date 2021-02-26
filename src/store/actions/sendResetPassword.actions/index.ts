export const SEND_RESET_PASSWORD = '[SEND RESET PASSWORD]';

export const SEND_RESET_PASSWORD_FETCH = `${SEND_RESET_PASSWORD} Fetch`;
export const SEND_RESET_PASSWORD_SET = `${SEND_RESET_PASSWORD} Set`;

export const fetchSendResetPassword: (
  data: form.SendResetPasswordI,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: SEND_RESET_PASSWORD_FETCH,
});

export const setSendResetPassword: (
  data: {
    errors?: form.SendResetPasswordI;
    status?: store.FormStatus;
  },
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: SEND_RESET_PASSWORD_SET,
});
