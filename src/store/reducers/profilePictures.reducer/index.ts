import { PROFILE_PICTURES_SET } from '#store/actions';

interface InitialStateI {
  status: store.FormStatus;
  profilePictures: ProfilePictureI[];
}

const initialState: InitialStateI = {
  status: 'pending',
  profilePictures: [],
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
        profilePictures: action.payload ? action.payload.data.profilePictures : [],
      };
    default:
      return state;
  }
};
