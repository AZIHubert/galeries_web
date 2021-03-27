export const FRAME = '[FRAME]';

export const FRAME_POST = `${FRAME} Post`;
export const FRAME_SET = `${FRAME} Set`;

export const postFrame: (
  data: {
    images: FormData,
    galerieId: string;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: FRAME_POST,
});

export const resetFrame: () => store.ActionI = () => ({
  payload: {
    data: {
      status: 'pending',
    },
  },
  type: FRAME_SET,
});

export const setFrame: (
  data: {
    status?: store.Status;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: FRAME_SET,
});
