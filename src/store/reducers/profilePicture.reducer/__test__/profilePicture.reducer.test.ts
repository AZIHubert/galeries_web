import {
  PROFILE_PICTURE_SET,
} from '#store/actions';

import reducer from '../index';

describe('notification', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        status: 'pending',
      });
    });
    it('should set profilePicture', () => {
      const data = {
        status: 'success',
      };
      expect(reducer(undefined, {
        payload: {
          data,
        },
        type: PROFILE_PICTURE_SET,
      })).toEqual(data);
    });
  });
});
