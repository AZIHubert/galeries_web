export const LOADER_SET = '[UI] SET_LOADER';

export const setLoader = (
  data: boolean,
) => ({
  type: LOADER_SET,
  payload: {
    data,
  },
});
