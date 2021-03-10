import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  SEND_TICKET,
  SEND_TICKET_FETCH,
  SEND_TICKET_SET,
  UI_SET,
  fetchSendTicket,
  resetSendTicket,
  setLoader,
  setSendTicket,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('sendTicket', () => {
  describe('actions', () => {
    const data = {
      body: 'body',
      header: 'header',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: SEND_TICKET_FETCH,
      };
      expect(fetchSendTicket(data)).toEqual(expectedAction);
    });
    it('should create a reset actions', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              body: '',
              header: '',
            },
            status: 'pending',
          },
        },
        type: SEND_TICKET_SET,
      };
      expect(resetSendTicket()).toEqual(expectedAction);
    });
    it('should create a set actions', () => {
      const setData = {
        errors: data,
        status: 'pending',
      } as {
        errors?: form.SendTicketI;
        status?: store.Status;
      };
      const expectedAction = {
        payload: {
          data: setData,
        },
        type: SEND_TICKET_SET,
      };
      expect(setSendTicket(setData)).toEqual(expectedAction);
    });
    describe('should fetch sendTicket', () => {
      it('success', () => {
        (apiMiddleware as jest.Mock).mockImplementation((
          { dispatch },
        ) => (
          next: Function,
        ) => (
          action: any,
        ) => {
          next(action);
          const {
            payload,
            type,
          } = action;
          if (type.includes(API_REQUEST)) {
            dispatch(setLoader(true));
            dispatch({
              payload: { data: {} },
              type: `${payload.meta.entity} ${API_SUCCESS}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchSendTicket(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_TICKET_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SEND_TICKET_SET);
        expect(actions[2].type).toEqual(`${SEND_TICKET} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SEND_TICKET} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(SEND_TICKET_SET);
        expect(actions[6].payload).toEqual({
          data: {
            error: false,
            text: 'you\'re ticket has been send',
          },
        });
        expect(actions[6].type).toEqual(NOTIFICATION_SET);
        expect(actions[7].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[7].type).toEqual(UI_SET);
      });
      it('global error', () => {
        const globalError = 'global error';
        (apiMiddleware as jest.Mock).mockImplementation((
          { dispatch },
        ) => (
          next: Function,
        ) => (
          action: any,
        ) => {
          next(action);
          const {
            payload,
            type,
          } = action;
          if (type.includes(API_REQUEST)) {
            dispatch(setLoader(true));
            dispatch({
              payload: { data: globalError },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchSendTicket(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_TICKET_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SEND_TICKET_SET);
        expect(actions[2].type).toEqual(`${SEND_TICKET} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SEND_TICKET} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SEND_TICKET_SET);
        expect(actions[6].payload).toEqual({
          data: {
            error: true,
            text: globalError,
          },
        });
        expect(actions[6].type).toEqual(NOTIFICATION_SET);
        expect(actions[7].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[7].type).toEqual(UI_SET);
      });
      it('field error', () => {
        const headerError = 'header error';
        (apiMiddleware as jest.Mock).mockImplementation((
          { dispatch },
        ) => (
          next: Function,
        ) => (
          action: any,
        ) => {
          next(action);
          const {
            payload,
            type,
          } = action;
          if (type.includes(API_REQUEST)) {
            dispatch(setLoader(true));
            dispatch({
              payload: {
                data: {
                  header: headerError,
                },
              },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchSendTicket(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_TICKET_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SEND_TICKET_SET);
        expect(actions[2].type).toEqual(`${SEND_TICKET} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SEND_TICKET} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              header: headerError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SEND_TICKET_SET);
        expect(actions[6].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[6].type).toEqual(UI_SET);
      });
    });
  });
});
