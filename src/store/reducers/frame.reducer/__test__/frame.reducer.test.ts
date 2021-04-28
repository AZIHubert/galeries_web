import {
  FRAME_SET,
} from '#store/actions';

import reducer from '../index';

describe('profilePicture', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        status: 'pending',
      });
    });
    it('should set profilePicture status', () => {
      const status = {
        status: 'success',
      };
      expect(reducer(undefined, {
        payload: {
          data: {
            status,
          },
        },
        type: FRAME_SET,
      })).toEqual({
        status,
      });
    });
  });
});
