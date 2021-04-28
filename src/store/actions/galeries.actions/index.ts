export const GALERIES = '[GALERIES]';

export const GALERIES_FETCH = `${GALERIES} Fetch`;
export const GALERIES_SET = `${GALERIES} Set`;

export const fetchGaleries: () => store.ActionI = () => ({
  type: GALERIES_FETCH,
});

export const resetGaleries: () => store.ActionI = () => ({
  payload: {
    data: {
      end: false,
      status: 'pending',
      galeries: {},
      page: 1,
    },
  },
  type: GALERIES_SET,
});

export const setGaleries: (
  data: {
    end?: boolean;
    status?: store.Status;
    galeries?: { [name: string]: GalerieI},
    page?: number
  }
) => store.ActionI = (
  data,
) => ({
  payload: { data },
  type: GALERIES_SET,
});
