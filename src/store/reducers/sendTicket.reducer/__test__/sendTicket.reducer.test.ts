import { SEND_TICKET_SET } from '#store/actions';

import reducer from '../index';

describe('sendTicket', () => {
  describe('reducer', () => {
    it('should set initial state', () => {
      expect(reducer(undefined, {
        type: '@@INIT',
      })).toEqual({
        errors: {
          body: '',
          header: '',
        },
        status: 'pending',
      });
    });
    it('should set error', () => {
      const header = 'header';
      expect(reducer(
        undefined, {
          payload: {
            data: {
              errors: {
                header,
              },
            },
          },
          type: SEND_TICKET_SET,
        },
      )).toEqual({
        errors: {
          body: '',
          header,
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
          type: SEND_TICKET_SET,
        },
      )).toEqual({
        errors: {
          body: '',
          header: '',
        },
        status,
      });
    });
  });
});
