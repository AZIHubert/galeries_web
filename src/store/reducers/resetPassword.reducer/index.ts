import { RESET_PASSWORD_SET_ERRORS } from '#store/actions';

const initialState = {
  errors: {
    confirmPassword: null,
    password: null,
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
    case RESET_PASSWORD_SET_ERRORS:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...payload.data,
        },
      };
    default:
      return state;
  }
};
