import { LOGIN_SET } from '#store/actions';

interface InitialStateI {
  status: store.FormStatus,
  errors: {
    password: string | null;
    userNameOrEmail: string | null;
  },
}

const initialState: InitialStateI = {
  status: 'pending',
  errors: {
    password: null,
    userNameOrEmail: null,
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
    case LOGIN_SET:
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
