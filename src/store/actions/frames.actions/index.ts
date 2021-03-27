export const FRAMES = '[FRAMES]';

export const FRAMES_FETCH = `${FRAMES} Fetch`;

export const fetchFrames: (
  data: {
    galerieId: string;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: FRAMES_FETCH,
});
