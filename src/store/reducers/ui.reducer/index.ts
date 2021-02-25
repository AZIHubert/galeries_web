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
  const {
    payload,
    type,
  } = action;
  switch (type) {
    case LOADER_SET:
      return {
        ...state,
        ...payload.data,
      };
    default:
      return state;
  }
};
