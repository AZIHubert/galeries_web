import {
  PSEUDONYM_SET,
} from '#store/actions';

import reducer from '../index';

describe('pseudonym', () => {
  describe('reducer', () => {
    it('should set initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        errors: {
          pseudonym: '',
        },
        status: 'pending',
      });
    });
    it('should set error', () => {
      const pseudonym = 'pseudonym';
      expect(reducer(
        undefined, {
          payload: {
            data: {
              errors: {
                pseudonym,
              },
            },
          },
          type: PSEUDONYM_SET,
        },
      )).toEqual({
        errors: {
          pseudonym,
        },
        status: 'pending',
      });
    });
    it('should set status', () => {
      const status = 'success';
      expect(reducer(
        undefined, {
          payload: {
            data: {
              status,
            },
          },
          type: PSEUDONYM_SET,
        },
      )).toEqual({
        errors: {
          pseudonym: '',
        },
        status,
      });
    });
  });
});
