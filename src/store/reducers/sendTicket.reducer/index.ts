import { SEND_TICKET_SET } from '#store/actions';

interface InitialStateI {
  errors: form.SendTicketI,
  status: store.Status,
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
  switch (action.type) {
    case SEND_TICKET_SET:
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
