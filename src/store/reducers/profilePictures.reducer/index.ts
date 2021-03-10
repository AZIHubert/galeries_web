import { PROFILE_PICTURES_SET } from '#store/actions';

interface InitialStateI {
  end: boolean;
  page: number;
  profilePictures: { [name: string]: ProfilePictureI };
  status: store.Status;
}

const initialState: InitialStateI = {
  end: false,
  page: 0,
  profilePictures: {},
  status: 'pending',
};

export default (
  state = initialState,
  action: store.ActionI,
) => {
  switch (action.type) {
    case PROFILE_PICTURES_SET:
      return {
        ...state,
        ...action.payload ? action.payload.data : undefined,
      };
    default:
      return state;
  }
};
