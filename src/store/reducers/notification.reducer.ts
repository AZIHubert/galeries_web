import { SET_NOTIFICATION } from '../actions';

const initialState = {
  text: '',
  error: false,
};

export default (
  notification = initialState,
  action: ActionNotificationI,
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...notification,
        text: payload.text,
        error: payload.error,
      };
    default:
      return notification;
  }
};
