export const LOADER_SET = '[UI] Set';

export const setLoader: (
  data: boolean,
) => store.ActionI = (
  data,
) => ({
  payload: {
    data: {
      loading: data,
    },
  },
  type: LOADER_SET,
});
