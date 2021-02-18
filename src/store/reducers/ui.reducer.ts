import { SET_LOADER } from '../actions';

const initialState = {
  loading: false,
};

export default (
  ui = initialState,
  action: ActionUiI,
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_LOADER:
      return {
        ...ui,
        loading: payload.data,
      };
    default:
      return ui;
  }
};
