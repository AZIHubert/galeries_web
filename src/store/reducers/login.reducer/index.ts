import { LOGIN_SET } from '#store/actions';

interface InitialStateI {
  errors: form.LoginI,
  status: store.Status,
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
  switch (action.type) {
    case LOGIN_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
        errors: {
          ...state.errors,
          ...action.payload ? action.payload.data.errors : undefined,
        },
      };
    default:
      return state;
  }
};
