export const GALERIE = '[GALERIE]';

export const GALERIE_FETCH = `${GALERIE} Fetch`;
export const GALERIE_POST = `${GALERIE} Post`;
export const GALERIE_SET = `${GALERIE} Set`;

export const fetchGalerie: (
  data: {
    id: string
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: GALERIE_FETCH,
});

export const postGalerie: (
  data: {
    name: string;
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: GALERIE_POST,
});

export const resetGalerie: () => store.ActionI = () => ({
  payload: {
    data: {
      status: 'pending',
      errors: {
        name: '',
      },
    },
  },
  type: GALERIE_SET,
});

export const setGalerie: (
  data: {
    status?: store.Status;
    errors?: {
      name?: string;
    }
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: GALERIE_SET,
});
