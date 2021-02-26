export const NOTIFICATION_SET = '[NOTIFICATION] Set';

export const setNotification: (
  data: store.NotificationI,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: NOTIFICATION_SET,
});
