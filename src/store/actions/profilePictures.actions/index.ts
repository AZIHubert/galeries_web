export const PROFILE_PICTURES = '[PROFILE PICTURES]';

export const PROFILE_PICTURES_FETCH = `${PROFILE_PICTURES} Fetch`;
export const PROFILE_PICTURES_SET = `${PROFILE_PICTURES} Set`;

export const fetchProfilePictures: () => store.ActionI = () => ({
  type: PROFILE_PICTURES_FETCH,
});

export const resetProfilePictures: () => store.ActionI = () => ({
  payload: {
    data: {
      end: false,
      status: 'pending',
      profilePictures: {},
      page: 1,
    },
  },
  type: PROFILE_PICTURES_SET,
});

export const setProfilePictures: (
  data: {
    end?: boolean;
    status?: store.Status,
    profilePictures?: { [name: string]: ProfilePictureI },
    page?: number,
  },
) => store.ActionI = (
  data,
) => ({
  payload: {
    data,
  },
  type: PROFILE_PICTURES_SET,
});
