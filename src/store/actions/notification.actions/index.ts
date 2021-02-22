export const NOTIFICATION_SET = '[NOTIFICATION] Set';

export const setNotification = (
  data: {
    text: string;
    error: boolean;
  },
) => ({
  type: NOTIFICATION_SET,
  payload: {
    data,
  },
});
