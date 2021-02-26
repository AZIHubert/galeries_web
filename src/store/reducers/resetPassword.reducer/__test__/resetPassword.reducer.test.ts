import {
  RESET_PASSWORD_SET,
} from '#store/actions';

import reducer from '../index';

describe('resetPassword', () => {
  describe('reducer', () => {
    it('should set initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        errors: {
          confirmPassword: '',
          password: '',
        },
        status: 'pending',
      });
    });
    it('should set error', () => {
      const password = 'password';
      expect(reducer(
        undefined, {
          payload: {
            data: {
              errors: {
                password,
              },
            },
          },
          type: RESET_PASSWORD_SET,
        },
      )).toEqual({
        errors: {
          confirmPassword: '',
          password,
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
          type: RESET_PASSWORD_SET,
        },
      )).toEqual({
        errors: {
          confirmPassword: '',
          password: '',
        },
        status,
      });
    });
  });
});
