import { SIGNIN_ERROR } from '#store/actions';

const initialState = {
  confirmPassword: null,
  email: null,
  password: null,
  userName: null,
};

export default (
  signin = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case SIGNIN_ERROR:
      return {
        ...signin,
        password: data.password,
        userNameOrEmail: data.userNameOrEmail,
      };
    default:
      return signin;
  }
};
