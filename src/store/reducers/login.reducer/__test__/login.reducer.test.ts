import reducer from '../index';

import {
  LOGIN_SET,
} from '#store/actions';

describe('login', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        errors: {
          password: '',
          userNameOrEmail: '',
        },
        status: 'pending',
      });
    });
    it('should set errors', () => {
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
          type: LOGIN_SET,
        },
      )).toEqual({
        errors: {
          password,
          userNameOrEmail: '',
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
          type: LOGIN_SET,
        },
      )).toEqual({
        errors: {
          password: '',
          userNameOrEmail: '',
        },
        status,
      });
    });
  });
});
