export const PROFILE_PICTURE = '[PROFILE PICTURE]';

export const PROFILE_PICTURE_DELETE = `${PROFILE_PICTURE} Delete`;
export const PROFILE_PICTURE_FETCH = `${PROFILE_PICTURE} Fetch`;
export const PROFILE_PICTURE_POST = `${PROFILE_PICTURE} Post`;
export const PROFILE_PICTURE_PUT = `${PROFILE_PICTURE} Put`;
export const PROFILE_PICTURE_SET = `${PROFILE_PICTURE} Set`;

export const deleteProfilePicture: (
  data: {
    id: string
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PROFILE_PICTURE_DELETE,
});

export const fetchProfilePicture: (
  data: {
    id: string
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PROFILE_PICTURE_FETCH,
});

export const postProfilePicture: (
  data: FormData
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PROFILE_PICTURE_POST,
});

export const putProfilePicture: (
  data: {
    id: string;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: PROFILE_PICTURE_PUT,
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
    status?: store.Status
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
