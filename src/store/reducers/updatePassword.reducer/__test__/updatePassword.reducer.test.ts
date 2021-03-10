import reducer from '../index';

import {
  UPDATE_PASSWORD_SET,
} from '#store/actions';

describe('login', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        errors: {
          confirmNewPassword: '',
          currentPassword: '',
          newPassword: '',
        },
        status: 'pending',
      });
    });
    it('should set errors', () => {
      const newPassword = 'newPassword';
      expect(reducer(
        undefined, {
          payload: {
            data: {
              errors: {
                newPassword,
              },
            },
          },
          type: UPDATE_PASSWORD_SET,
        },
      )).toEqual({
        errors: {
          confirmNewPassword: '',
          currentPassword: '',
          newPassword,
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
          type: UPDATE_PASSWORD_SET,
        },
      )).toEqual({
        errors: {
          confirmNewPassword: '',
          currentPassword: '',
          newPassword: '',
        },
        status,
      });
    });
  });
});
