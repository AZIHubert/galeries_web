import { RESET_PASSWORD_ERROR } from '#store/actions';

const initialState = {
  confirmPassword: null,
  password: null,
};

export default (
  resetPassword = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case RESET_PASSWORD_ERROR:
      return {
        ...resetPassword,
        confirmPassword: data.password,
        password: data.userNameOrEmail,
      };
    default:
      return resetPassword;
  }
};
