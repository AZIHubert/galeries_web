export const SET_NOTIFICATION = '[NOTIFICATION] Set';

export const setNotification = (
  notification: string,
  entity: store.Entity,
) => ({
  type: SET_NOTIFICATION,
  payload: {
    data: notification,
    meta: entity,
  },
});
