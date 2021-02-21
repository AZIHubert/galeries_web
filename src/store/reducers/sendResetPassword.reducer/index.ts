import { SEND_RESET_PASSWORD_ERROR } from '#store/actions';

const initialState = {
  email: null,
};

export default (
  sendResetPassword = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case SEND_RESET_PASSWORD_ERROR:
      return {
        ...sendResetPassword,
        email: data.email,
      };
    default:
      return sendResetPassword;
  }
};
