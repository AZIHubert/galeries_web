export const NOTIFICATION_SET = '[NOTIFICATION] Set';

export const setNotification = (
  data: string,
  entity: store.Entity,
) => ({
  type: NOTIFICATION_SET,
  payload: {
    data,
    meta: entity,
  },
});
