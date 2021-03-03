export const PROFILE_PICTURES = '[PROFILE PICTURES]';

export const PROFILE_PICTURES_FETCH = `${PROFILE_PICTURES} Fetch`;
export const PROFILE_PICTURES_SET = `${PROFILE_PICTURES} Set`;

export const fetchProfilePictures: () => store.ActionI = () => ({
  type: PROFILE_PICTURES_FETCH,
});

export const setProfilePictures: (
  data: {
    status?: store.FormStatus,
    profilePictures?: ProfilePictureI[]
  },
) => store.ActionI = (
  data,
) => ({
  payload: {
    data: {
      status: data.status,
      profilePictures: data.profilePictures || [],
    },
  },
  type: PROFILE_PICTURES_SET,
});
