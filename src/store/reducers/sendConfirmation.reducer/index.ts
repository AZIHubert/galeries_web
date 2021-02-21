import { SEND_CONFIRMATION_ERROR } from '#store/actions';

const initialState = {
  email: '',
};

export default (
  sendConfirmation = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case SEND_CONFIRMATION_ERROR:
      return {
        ...sendConfirmation,
        email: data.email,
      };
    default:
      return sendConfirmation;
  }
};
