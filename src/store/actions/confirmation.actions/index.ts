export const CONFIRMATION = '[CONFIRMATION]';

export const CONFIRMATION_ERROR = `${CONFIRMATION} Error`;
export const CONFIRMATION_FETCH = `${CONFIRMATION} Fetch`;

export const fetchConfirmation: (
  data: string,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: CONFIRMATION_FETCH,
});
