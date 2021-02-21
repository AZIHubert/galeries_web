export const CONFIRMATION = '[CONFIRMATION]';

export const CONFIRMATION_ERROR = `${CONFIRMATION} error`;
export const CONFIRMATION_FETCH = `${CONFIRMATION} fetch`;

export const fetchConfirmation = (
  data: string,
) => ({
  type: CONFIRMATION_FETCH,
  payload: {
    data,
  },
});
