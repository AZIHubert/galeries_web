import { NOTIFICATION_SET } from '#store/actions';

const initialState: store.NotificationI = {
  error: false,
  text: '',
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
    case NOTIFICATION_SET:
      return {
        ...state,
        ...payload.data,
      };
    default:
      return state;
  }
};
