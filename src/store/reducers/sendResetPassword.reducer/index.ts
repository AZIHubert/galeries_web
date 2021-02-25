import { SEND_RESET_PASSWORD_SET } from '#store/actions';

interface InitialStateI {
  errors: form.SendResetPasswordI;
  status: store.FormStatus;
}

const initialState: InitialStateI = {
  errors: {
    email: '',
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
    case SEND_RESET_PASSWORD_SET:
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
