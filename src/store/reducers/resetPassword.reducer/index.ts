import { RESET_PASSWORD_SET } from '#store/actions';

interface InitialStateI {
  errors: form.ResetPasswordI;
  status: store.Status;
}

const initialState: InitialStateI = {
  errors: {
    confirmPassword: '',
    password: '',
  },
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case RESET_PASSWORD_SET:
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
