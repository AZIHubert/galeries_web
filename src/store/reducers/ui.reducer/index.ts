import { UI_SET } from '#store/actions';

interface InitialStateI {
  init: boolean;
  loading: boolean;
}

const initialState: InitialStateI = {
  init: false,
  loading: false,
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case UI_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
      };
    default:
      return state;
  }
};
