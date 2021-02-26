import {
  LOADER_SET,
  setLoader,
} from '#store/actions';

describe('ui', () => {
  describe('actions', () => {
    it('should create a set actions', () => {
      const loading = true;
      const expectedAction = {
        payload: {
          data: {
            loading,
          },
        },
        type: LOADER_SET,
      };
      expect(setLoader(loading)).toEqual(expectedAction);
    });
  });
});
