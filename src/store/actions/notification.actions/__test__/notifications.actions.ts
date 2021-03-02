import {
  NOTIFICATION_SET,
  resetNotification,
  setNotification,
} from '#store/actions';

describe('notification', () => {
  describe('action', () => {
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            error: false,
            text: '',
          },
        },
        type: NOTIFICATION_SET,
      };
      expect(resetNotification()).toEqual(expectedAction);
    });
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
