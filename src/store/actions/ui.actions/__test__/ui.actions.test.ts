import {
  UI_SET,
  setInit,
  setLoader,
} from '#store/actions';

describe('ui', () => {
  describe('actions', () => {
    it('should create a set loader action', () => {
      const loading = true;
      const expectedAction = {
        payload: {
          data: {
            loading,
          },
        },
        type: UI_SET,
      };
      expect(setLoader(loading)).toEqual(expectedAction);
    });
    it('should create a set init action', () => {
      const init = true;
      const expectedAction = {
        payload: {
          data: {
            init,
          },
        },
        type: UI_SET,
      };
      expect(setInit(init)).toEqual(expectedAction);
    });
  });
});
