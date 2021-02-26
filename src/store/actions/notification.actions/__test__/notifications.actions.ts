import {
  NOTIFICATION_SET,
  setNotification,
} from '#store/actions';

describe('notification', () => {
  describe('action', () => {
    it('should create a set action', () => {
      const data = {
        text: 'text',
        error: true,
      };
      const expectedAction = {
        type: NOTIFICATION_SET,
        payload: {
          data,
        },
      };
      expect(setNotification(data)).toEqual(expectedAction);
    });
  });
});
