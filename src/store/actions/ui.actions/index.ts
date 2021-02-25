export const LOADER_SET = '[UI] Set';

export const setLoader: (
  data: boolean,
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: LOADER_SET,
});
