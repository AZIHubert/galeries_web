import { NOTIFICATION_SET } from '#store/actions';

const initialState: store.NotificationI = {
  error: false,
  text: '',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case NOTIFICATION_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
      };
    default:
      return state;
  }
};
