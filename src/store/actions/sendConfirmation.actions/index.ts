export const SEND_CONFIRMATION = '[RESEND CONFIRMATION]';

export const SEND_CONFIRMATION_ERROR = `${SEND_CONFIRMATION} error`;
export const SEND_CONFIRMATION_FETCH = `${SEND_CONFIRMATION} fetch`;

export const fetchSendConfirmation = (
  data: { email: string; },
) => ({
  type: SEND_CONFIRMATION_FETCH,
  data,
});

export const setSendConfirmationError = (
  data: { email: string; },
) => ({
  type: SEND_CONFIRMATION_ERROR,
  data,
});
