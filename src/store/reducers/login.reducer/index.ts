import { LOGIN_ERROR } from '#store/actions';

const initialState = {
  password: null,
  userNameOrEmail: null,
};

export default (
  login = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case LOGIN_ERROR:
      return {
        ...login,
        password: data.password,
        userNameOrEmail: data.userNameOrEmail,
      };
    default:
      return login;
  }
};
