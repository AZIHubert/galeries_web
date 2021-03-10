import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  SEND_RESET_PASSWORD,
  SEND_RESET_PASSWORD_FETCH,
  SEND_RESET_PASSWORD_SET,
  UI_SET,
  fetchSendResetPassword,
  resetSendResetPassword,
  setLoader,
  setSendResetPassword,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('sendResetPassword', () => {
  describe('actions', () => {
    const data = {
      email: 'email',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: SEND_RESET_PASSWORD_FETCH,
      };
      expect(fetchSendResetPassword(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              email: '',
            },
            status: 'pending',
          },
        },
        type: SEND_RESET_PASSWORD_SET,
      };
      expect(resetSendResetPassword()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        errors: data,
        status: 'pending',
      } as {
        errors?: form.SendResetPasswordI;
        status?: store.Status;
      };
      const expectedAction = {
        payload: {
          data: setData,
        },
        type: SEND_RESET_PASSWORD_SET,
      };
      expect(setSendResetPassword(setData)).toEqual(expectedAction);
    });
    describe('should fetch sendResetPassword', () => {
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
        store.dispatch(fetchSendResetPassword(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_RESET_PASSWORD_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SEND_RESET_PASSWORD_SET);
        expect(actions[2].type).toEqual(`${SEND_RESET_PASSWORD} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SEND_RESET_PASSWORD} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(SEND_RESET_PASSWORD_SET);
        expect(actions[6].payload).toEqual({
          data: {
            text: 'an email has been sent to you',
            error: false,
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
        store.dispatch(fetchSendResetPassword(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_RESET_PASSWORD_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SEND_RESET_PASSWORD_SET);
        expect(actions[2].type).toEqual(`${SEND_RESET_PASSWORD} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SEND_RESET_PASSWORD} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SEND_RESET_PASSWORD_SET);
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
        store.dispatch(fetchSendResetPassword(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SEND_RESET_PASSWORD_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SEND_RESET_PASSWORD_SET);
        expect(actions[2].type).toEqual(`${SEND_RESET_PASSWORD} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SEND_RESET_PASSWORD} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              email: emailError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SEND_RESET_PASSWORD_SET);
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
