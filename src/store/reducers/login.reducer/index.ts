import { LOGIN_SET } from '#store/actions';

interface InitialStateI {
  errors: form.LoginI,
  status: store.FormStatus,
}

const initialState: InitialStateI = {
  errors: {
    password: '',
    userNameOrEmail: '',
  },
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  const {
    payload,
    type,
  } = action;
  switch (type) {
    case LOGIN_SET:
      return {
        ...state,
        ...payload.data,
        errors: {
          ...state.errors,
          ...payload.data.errors,
        },
      };
    default:
      return state;
  }
};
