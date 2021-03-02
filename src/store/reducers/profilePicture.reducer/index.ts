import { PROFILE_PICTURE_SET } from '#store/actions';

interface InitialStateI {
  status: store.FormStatus,
}

const initialState: InitialStateI = {
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case PROFILE_PICTURE_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
      };
    default:
      return state;
  }
};
