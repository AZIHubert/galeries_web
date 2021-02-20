export const SET_LOADER = '[UI] SET_LOADER';

export const setLoader = (
  state: boolean,
) => ({
  type: SET_LOADER,
  payload: state,
});
