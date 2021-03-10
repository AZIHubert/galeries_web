import { SIGNIN_SET } from '#store/actions';

interface InitialStateI {
  errors: form.SigninI;
  status: store.Status;
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
  switch (action.type) {
    case SIGNIN_SET:
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
