export const UPDATE_EMAIL_CONFIRM = '[CONFIRM UPDATE EMAIL]';

export const UPDATE_EMAIL_CONFIRM_POST = `${UPDATE_EMAIL_CONFIRM} Post`;
export const UPDATE_EMAIL_CONFIRM_SET = `${UPDATE_EMAIL_CONFIRM} Set`;

export const postUpdateEmailConfirm: (
  data: {
    email: string;
    password: string;
    confirmToken: string;
  }
) => store.ActionI = (
  data,
) => ({
  payload: {
    data,
  },
  type: UPDATE_EMAIL_CONFIRM_POST,
});

export const resetUpdateEmailConfirm: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        email: '',
        password: '',
      },
      status: 'pending',
    },
  },
  type: UPDATE_EMAIL_CONFIRM_SET,
});

export const setUpdateEmailConfirm: (
  data: {
    errors?: form.ChangeEmailConfirmI;
    status?: store.Status
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: UPDATE_EMAIL_CONFIRM_SET,
});
