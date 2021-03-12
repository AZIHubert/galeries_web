import reducer from '../index';

import {
  ACCOUNT_SET,
} from '#store/actions';

describe('account', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        errors: {
          deleteAccountSentence: '',
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
          type: ACCOUNT_SET,
        },
      )).toEqual({
        errors: {
          deleteAccountSentence: '',
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
          type: ACCOUNT_SET,
        },
      )).toEqual({
        errors: {
          deleteAccountSentence: '',
          password: '',
          userNameOrEmail: '',
        },
        status,
      });
    });
  });
});
