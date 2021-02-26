import {
  NOTIFICATION_SET,
} from '#store/actions';

import reducer from '../index';

describe('notification', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        error: false,
        text: '',
      });
    });
    it('should set notification', () => {
      const data = {
        error: true,
        text: 'text',
      };
      expect(reducer(undefined, {
        payload: {
          data,
        },
        type: NOTIFICATION_SET,
      })).toEqual(data);
    });
  });
});
