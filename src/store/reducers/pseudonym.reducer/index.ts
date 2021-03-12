import { PSEUDONYM_SET } from '#store/actions';

interface InitialStateI {
  errors: form.PseudonymI;
  status: store.Status;
}

const initialState: InitialStateI = {
  errors: {
    pseudonym: '',
  },
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case PSEUDONYM_SET:
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
