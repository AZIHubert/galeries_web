import { SET_LOADER } from '#store/actions';

const initialState = {
  loading: false,
};

export default (
  ui = initialState,
  action: store.ActionI,
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LOADER:
      return {
        ...ui,
        loading: payload,
      };
    default:
      return ui;
  }
};
