export const UPDATE_EMAIL_VALIDATE = '[UPDATE EMAIL VALIDATE]';

export const UPDATE_EMAIL_VALIDATE_PUT = `${UPDATE_EMAIL_VALIDATE} Put`;
export const UPDATE_EMAIL_VALIDATE_SET = `${UPDATE_EMAIL_VALIDATE} Set`;

export const putUpdateEmailValidate: (
  data: {
    password: string;
    confirmToken: string
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: UPDATE_EMAIL_VALIDATE_PUT,
});

export const resetUpdateEmailValidate: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        password: '',
      },
      status: 'pending',
    },
  },
  type: UPDATE_EMAIL_VALIDATE_SET,
});

export const setUpdateEmailValidate: (
  data: {
    errors?: form.UpdateEmailI;
    status?: store.Status;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: UPDATE_EMAIL_VALIDATE_SET,
});
