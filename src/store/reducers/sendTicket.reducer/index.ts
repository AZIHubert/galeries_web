import { SEND_TICKET_SET } from '#store/actions';

interface InitialStateI {
  status: store.FormStatus,
  errors: {
    body: string | null;
    header: string | null;
  },
}

const initialState: InitialStateI = {
  status: 'pending',
  errors: {
    body: null,
    header: null,
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
    case SEND_TICKET_SET:
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
