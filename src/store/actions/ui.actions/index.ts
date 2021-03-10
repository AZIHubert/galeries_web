export const UI_SET = '[UI] Set';

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
  type: UI_SET,
});

export const setInit: (
  data: boolean,
) => store.ActionI = (
  data,
) => ({
  payload: {
    data: {
      init: data,
    },
  },
  type: UI_SET,
});
