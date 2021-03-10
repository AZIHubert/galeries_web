export const RESET_PASSWORD = '[RESET PASSWORD]';

export const RESET_PASSWORD_FETCH = `${RESET_PASSWORD} Fetch`;
export const RESET_PASSWORD_SET = `${RESET_PASSWORD} Set`;

export const fetchResetPassword: (
  data: {
    confirmPassword: string;
    confirmToken: string;
    password: string;
  },
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: RESET_PASSWORD_FETCH,
});

export const resetResetPassword: () => store.ActionI = () => ({
  payload: {
    data: {
      error: {
        confirmPassword: '',
        password: '',
      },
      status: 'pending',
    },
  },
  type: RESET_PASSWORD_SET,
});

export const setResetPassword: (
  data: {
    errors?: form.ResetPasswordI;
    status?: store.Status;
  },
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: RESET_PASSWORD_SET,
});
