import {
  PROFILE_PICTURE_SET,
} from '#store/actions';

import reducer from '../index';

describe('profilePicture', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        status: 'pending',
        current: {
          croped: '',
          original: '',
          pending: '',
        },
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
        type: PROFILE_PICTURE_SET,
      })).toEqual({
        status,
        current: {
          croped: '',
          original: '',
          pending: '',
        },
      });
    });
    it('should set current profilePicture', () => {
      const current = {
        croped: 'croped',
        original: 'original',
        pending: 'pending',
      };
      expect(reducer(undefined, {
        payload: {
          data: {
            current,
          },
        },
        type: PROFILE_PICTURE_SET,
      })).toEqual({
        status: 'pending',
        current,
      });
    });
  });
});
