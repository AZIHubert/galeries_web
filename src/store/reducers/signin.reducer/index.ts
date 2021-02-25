import { SIGNIN_SET } from '#store/actions';

interface InitialStateI {
  errors: form.SigninI;
  status: store.FormStatus;
}

const initialState: InitialStateI = {
  errors: {
    confirmPassword: '',
    email: '',
    password: '',
    userName: '',
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
    case SIGNIN_SET:
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
