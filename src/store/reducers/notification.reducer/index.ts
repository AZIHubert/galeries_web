import { SET_NOTIFICATION } from '#store/actions';

const initialState = '';

export default (
  notification = initialState,
  action: store.ActionI,
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_NOTIFICATION:
      return payload.data;
    default:
      return notification;
  }
};
