import { SEND_CONFIRMATION_SET } from '#store/actions';

interface InitialStateI {
  errors: form.SendConfirmationI;
  status: store.Status;
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
  switch (action.type) {
    case SEND_CONFIRMATION_SET:
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
