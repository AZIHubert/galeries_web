import { SEND_CONFIRMATION_SET } from '#store/actions';

interface InitialStateI {
  errors: form.SendConfirmationI;
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
    case SEND_CONFIRMATION_SET:
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
