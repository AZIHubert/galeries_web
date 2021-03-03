export const INIT_USER_FETCH = '[INIT_USER] Fetch';

export const fetchInitUser: () => store.ActionI = () => ({
  type: INIT_USER_FETCH,
});
