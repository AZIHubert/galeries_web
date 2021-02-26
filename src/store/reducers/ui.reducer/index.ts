import { LOADER_SET } from '#store/actions';

interface InitialStateI {
  loading: boolean;
}

const initialState: InitialStateI = {
  loading: false,
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case LOADER_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
      };
    default:
      return state;
  }
};
