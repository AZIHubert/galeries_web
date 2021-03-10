export const UPDATE_EMAIL = '[UPDATE EMAIL]';

export const UPDATE_EMAIL_POST = `${UPDATE_EMAIL} Post`;
export const UPDATE_EMAIL_SET = `${UPDATE_EMAIL} Set`;

export const postUpdateEmail: (
  data: form.UpdateEmailI
) => store.ActionI = (
  data,
) => ({
  payload: {
    data,
  },
  type: UPDATE_EMAIL_POST,
});

export const resetUpdateEmail: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        password: '',
      },
      status: 'pending',
    },
  },
  type: UPDATE_EMAIL_SET,
});

export const setUpdateEmail: (
  data: {
    errors?: form.UpdateEmailI;
    status?: store.Status;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: UPDATE_EMAIL_SET,
});
