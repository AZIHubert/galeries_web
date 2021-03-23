import {
  GALERIES_FETCH,
  GALERIES_SET,
  fetchGaleries,
  resetGaleries,
  setGaleries,
} from '#store/actions';

describe('galeries', () => {
  describe('actions', () => {
    it('should create a fetch action', () => {
      const expectedAction = {
        type: GALERIES_FETCH,
      };
      expect(fetchGaleries()).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            end: false,
            status: 'pending',
            galeries: {},
            page: 1,
          },
        },
        type: GALERIES_SET,
      };
      expect(resetGaleries()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const data = {
        end: true,
        status: 'success',
      } as {
        end?: boolean;
        status?: store.Status;
        galeries?: { [name: string]: GalerieI},
        page?: number
      };
      const expectedAction = {
        payload: { data },
        type: GALERIES_SET,
      };
      expect(setGaleries(data)).toEqual(expectedAction);
    });
  });
});
