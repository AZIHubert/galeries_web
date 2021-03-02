export const NOTIFICATION_SET = '[NOTIFICATION] Set';

export const resetNotification: () => store.ActionI = () => ({
  payload: {
    data: {
      error: false,
      text: '',
    },
  },
  type: NOTIFICATION_SET,
});

export const setNotification: (
  data: store.NotificationI,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: NOTIFICATION_SET,
});
