import { PROFILE_PICTURE_SET } from '#store/actions';

interface InitialStateI {
  status: store.Status;
  current: {
    croped: string;
    original: string;
    pending: string;
  }
}

const initialState: InitialStateI = {
  status: 'pending',
  current: {
    croped: '',
    original: '',
    pending: '',
  },
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
        current: {
          ...state.current,
          ...action.payload ? action.payload.data.current : undefined,
        },
      };
    default:
      return state;
  }
};
