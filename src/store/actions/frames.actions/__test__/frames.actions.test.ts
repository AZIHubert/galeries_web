import {
  FRAMES_FETCH,
  fetchFrames,
} from '#store/actions';

describe('frames', () => {
  describe('actions', () => {
    const data = {
      galerieId: '1',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: { data },
        type: FRAMES_FETCH,
      };
      expect(fetchFrames(data)).toEqual(expectedAction);
    });
  });
});
