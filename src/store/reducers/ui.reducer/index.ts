import { LOADER_SET } from '#store/actions';

const initialState = {
  loading: false,
};

export default (
  ui = initialState,
  action: store.ActionI,
) => {
  const {
    payload: { data },
    type,
  } = action;
  switch (type) {
    case LOADER_SET:
      return {
        ...ui,
        loading: data,
      };
    default:
      return ui;
  }
};
