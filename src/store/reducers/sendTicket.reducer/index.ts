import { SEND_TICKET_SET } from '#store/actions';

interface InitialStateI {
  errors: form.SendTicketI,
  status: store.FormStatus,
}

const initialState: InitialStateI = {
  errors: {
    body: '',
    header: '',
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
