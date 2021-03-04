export const PROFILE_PICTURE = '[PROFILE PICTURE]';

export const PROFILE_PICTURE_FETCH = `${PROFILE_PICTURE} Fetch`;
export const PROFILE_PICTURE_SET = `${PROFILE_PICTURE} Set`;

export const fetchProfilePicture: (
  data: FormData
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PROFILE_PICTURE_FETCH,
});

export const resetProfilePicture: () => store.ActionI = () => ({
  payload: {
    data: {
      status: 'pending',
    },
  },
  type: PROFILE_PICTURE_SET,
});

export const setProfilePicture: (
  data: {
    status?: store.FormStatus
    current?: {
      croped: string;
      original?: string;
      pending?: string;
    }
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PROFILE_PICTURE_SET,
});
