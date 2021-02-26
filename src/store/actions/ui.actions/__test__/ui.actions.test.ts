import {
  LOADER_SET,
  setLoader,
} from '#store/actions';

describe('ui', () => {
  describe('actions', () => {
    it('should create a set actions', () => {
      const data = true;
      const expectedAction = {
        payload: {
          data,
        },
        type: LOADER_SET,
      };
      expect(setLoader(data)).toEqual(expectedAction);
    });
  });
});
