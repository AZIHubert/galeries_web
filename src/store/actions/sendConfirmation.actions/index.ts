export const SEND_CONFIRMATION = '[SEND CONFIRMATION]';

export const SEND_CONFIRMATION_SET = `${SEND_CONFIRMATION} set`;
export const SEND_CONFIRMATION_FETCH = `${SEND_CONFIRMATION} fetch`;

export const fetchSendConfirmation = (
  data: {
    email: string;
  },
) => ({
  type: SEND_CONFIRMATION_FETCH,
  payload: {
    data,
  },
});

export const setSendConfirmation = (
  data: {
    status?: store.FormStatus;
    errors?: {
      email: string;
    }
  },
) => ({
  type: SEND_CONFIRMATION_SET,
  payload: {
    data,
  },
});
