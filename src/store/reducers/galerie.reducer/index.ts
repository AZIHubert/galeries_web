import { GALERIE_SET } from '#store/actions';

interface InitialStateI {
  status: store.Status;
  errors: {
    name: string;
  }
}

const initialState: InitialStateI = {
  status: 'pending',
  errors: {
    name: '',
  },
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case GALERIE_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
        errors: {
          ...state.errors,
          ...action.payload ? action.payload.data.errors : undefined,
        },
      };
    default:
      return state;
  }
};
