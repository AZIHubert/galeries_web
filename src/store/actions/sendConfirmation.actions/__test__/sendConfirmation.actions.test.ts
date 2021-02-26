import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  LOADER_SET,
  NOTIFICATION_SET,
  SEND_CONFIRMATION,
  SEND_CONFIRMATION_FETCH,
  SEND_CONFIRMATION_SET,
  fetchSendConfirmation,
  setLoader,
  setSendConfirmation,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('sendConfirmation', () => {
  const data = {
    email: 'email',
  };
  describe('actions', () => {
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: SEND_CONFIRMATION_FETCH,
      };
      expect(fetchSendConfirmation(data)).toEqual(expectedAction);
    });
    it('shoudl create a set action', () => {
      const setData = {
        errors: data,
        status: 'pending',
      } as {
        errors?: form.SendConfirmationI;
        status?: store.FormStatus;
      };
      const expectedAtion = {
        payload: {
          data: setData,
        },
        type: SEND_CONFIRMATION_SET,
      };
      expect(setSendConfirmation(setData)).toEqual(expectedAtion);
    });
    describe('should fetch sendConfirmation', () => {
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
        store.dispatch(fetchSendConfirmation(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_CONFIRMATION_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'pending',
          },
        });
        expect(actions[1].type).toEqual(SEND_CONFIRMATION_SET);
        expect(actions[2].type).toEqual(`${SEND_CONFIRMATION} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(LOADER_SET);
        expect(actions[4].type).toEqual(`${SEND_CONFIRMATION} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(SEND_CONFIRMATION_SET);
        expect(actions[6].payload).toEqual({
          data: {
            error: false,
            text: 'an email has been sent to you',
          },
        });
        expect(actions[6].type).toEqual(NOTIFICATION_SET);
        expect(actions[7].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[7].type).toEqual(LOADER_SET);
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
        store.dispatch(fetchSendConfirmation(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_CONFIRMATION_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'pending',
          },
        });
        expect(actions[1].type).toEqual(SEND_CONFIRMATION_SET);
        expect(actions[2].type).toEqual(`${SEND_CONFIRMATION} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(LOADER_SET);
        expect(actions[4].type).toEqual(`${SEND_CONFIRMATION} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SEND_CONFIRMATION_SET);
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
        expect(actions[7].type).toEqual(LOADER_SET);
      });
      it('field error', () => {
        const emailError = 'password error';
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
                  email: emailError,
                },
              },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchSendConfirmation(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_CONFIRMATION_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'pending',
          },
        });
        expect(actions[1].type).toEqual(SEND_CONFIRMATION_SET);
        expect(actions[2].type).toEqual(`${SEND_CONFIRMATION} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(LOADER_SET);
        expect(actions[4].type).toEqual(`${SEND_CONFIRMATION} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              email: emailError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SEND_CONFIRMATION_SET);
        expect(actions[6].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[6].type).toEqual(LOADER_SET);
      });
    });
  });
});
