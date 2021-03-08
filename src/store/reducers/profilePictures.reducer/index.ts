import { PROFILE_PICTURES_SET } from '#store/actions';

interface InitialStateI {
  end: boolean;
  status: store.Status;
  profilePictures: ProfilePictureI[];
  page: number;
}

const initialState: InitialStateI = {
  end: false,
  status: 'pending',
  profilePictures: [],
  page: 0,
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
