export const SEND_CONFIRMATION = '[SEND CONFIRMATION]';

export const SEND_CONFIRMATION_FETCH = `${SEND_CONFIRMATION} Fetch`;
export const SEND_CONFIRMATION_SET = `${SEND_CONFIRMATION} Set`;

export const fetchSendConfirmation: (
  data: form.SendConfirmationI,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: SEND_CONFIRMATION_FETCH,
});

export const resetSendConfirmation: () => store.ActionI = () => ({
  payload: {
    data: {
      errors: {
        confirmPassword: '',
        password: '',
      },
      status: 'pending',
    },
  },
  type: SEND_CONFIRMATION_SET,
});

export const setSendConfirmation: (
  data: {
    errors?: form.SendConfirmationI;
    status?: store.Status;
  },
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: SEND_CONFIRMATION_SET,
});
