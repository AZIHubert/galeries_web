import { NOTIFICATION_SET } from '#store/actions';

const initialState = '';

export default (
  notification = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case NOTIFICATION_SET:
      return data;
    default:
      return notification;
  }
};
