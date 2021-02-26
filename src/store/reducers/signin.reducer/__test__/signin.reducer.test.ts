import reducer from '../index';

describe('signin', () => {
  describe('reducer', () => {
    it('should set initial state', () => {
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
  });
});
