import { ACCOUNT_SET } from '#store/actions';

interface InitialStateI {
  errors: form.AccountI,
  status: store.Status,
}

const initialState: InitialStateI = {
  errors: {
    deleteAccountSentence: '',
    password: '',
    userNameOrEmail: '',
  },
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case ACCOUNT_SET:
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
