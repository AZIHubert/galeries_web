import { SIGNIN_SET } from '#store/actions';

interface InitialStateI {
  status: 'pending' | 'error' | 'success';
  errors: {
    confirmPassword: string | null;
    email: string | null;
    password: string | null;
    userName: string | null;
  }
}

const initialState: InitialStateI = {
  status: 'pending',
  errors: {
    confirmPassword: null,
    email: null,
    password: null,
    userName: null,
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
    case SIGNIN_SET:
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
