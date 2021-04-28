import { FRAME_SET } from '#store/actions';

interface InitialStateI {
  status: store.Status;
}

const initialState: InitialStateI = {
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case FRAME_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
      };
    default:
      return state;
  }
};
