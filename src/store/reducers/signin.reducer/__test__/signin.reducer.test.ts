import { SIGNIN_SET } from '#store/actions';

import reducer from '../index';

describe('signin', () => {
  describe('reducer', () => {
    it('should set initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        errors: {
          confirmPassword: '',
          email: '',
          password: '',
          userName: '',
        },
        status: 'pending',
      });
    });
    it('should set error', () => {
      const confirmPassword = 'header';
      expect(reducer(
        undefined, {
          payload: {
            data: {
              errors: {
                confirmPassword,
              },
            },
          },
          type: SIGNIN_SET,
        },
      )).toEqual({
        errors: {
          confirmPassword,
          email: '',
          password: '',
          userName: '',
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
          type: SIGNIN_SET,
        },
      )).toEqual({
        errors: {
          confirmPassword: '',
          email: '',
          password: '',
          userName: '',
        },
        status,
      });
    });
  });
});
