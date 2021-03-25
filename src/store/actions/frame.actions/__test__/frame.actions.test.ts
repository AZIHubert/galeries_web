import {
  FRAME_POST,
  FRAME_SET,
  postFrame,
  resetFrame,
  setFrame,
} from '#store/actions';

describe('frame', () => {
  describe('actions', () => {
    it('should create a post action', () => {
      const data = {
        images: [new FormData()],
        galerieId: '1',
      };
      const expectedAction = {
        payload: { data },
        type: FRAME_POST,
      };
      expect(postFrame(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            status: 'pending',
          },
        },
        type: FRAME_SET,
      };
      expect(resetFrame()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        status: 'success',
      } as {
        status: store.Status;
      };
      const expectedAction = {
        payload: { data: setData },
        type: FRAME_SET,
      };
      expect(setFrame(setData)).toEqual(expectedAction);
    });
  });
});
