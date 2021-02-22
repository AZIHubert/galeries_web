import { SEND_RESET_PASSWORD_ERROR } from '#store/actions';

const initialState = {
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
    case SEND_RESET_PASSWORD_ERROR:
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
