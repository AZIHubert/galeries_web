import { GALERIES_SET } from '#store/actions';

interface InitialStateI {
  end: boolean;
  page: number;
  galeries: { [name: string]: GalerieI };
  status: store.Status;
}

const initialState: InitialStateI = {
  end: false,
  page: 0,
  galeries: {},
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case GALERIES_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
      };
    default:
      return state;
  }
};
