import { SEND_CONFIRMATION_SET } from '#store/actions';

interface InitialStateI {
  status: store.FormStatus;
  errors: {
    email: string | null;
  }
}

const initialState: InitialStateI = {
  status: 'pending',
  errors: {
    email: null,
  },
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
