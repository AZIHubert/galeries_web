export const UPDATE_PASSWORD = '[UPDATE PASSWORD]';

export const UPDATE_PASSWORD_PUT = `${UPDATE_PASSWORD} Put`;
export const UPDATE_PASSWORD_SET = `${UPDATE_PASSWORD} Set`;

export const putUpdatePassword: (
  data: form.UpdatePasswordI
) => store.ActionI = (
  data,
) => ({
  payload: {
    data,
  },
  type: UPDATE_PASSWORD_PUT,
});

export const resetUpdatePassword: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        confirmNewPassword: '',
        currentPassword: '',
        newPassword: '',
      },
      status: 'pending',
    },
  },
  type: UPDATE_PASSWORD_SET,
});

export const setUpdatePassword: (
  data: {
    errors?: form.UpdatePasswordI;
    status?: store.Status;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: UPDATE_PASSWORD_SET,
});
