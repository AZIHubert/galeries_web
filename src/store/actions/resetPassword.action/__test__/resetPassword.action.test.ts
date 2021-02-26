import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  LOADER_SET,
  NOTIFICATION_SET,
  RESET_PASSWORD,
  RESET_PASSWORD_FETCH,
  RESET_PASSWORD_SET,
  fetchResetPassword,
  setLoader,
  setResetPassword,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('resetPassword', () => {
  describe('action', () => {
    const data = {
      confirmPassword: 'confirmPassword',
      confirmToken: 'confirmToken',
      password: 'password',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: RESET_PASSWORD_FETCH,
      };
      expect(fetchResetPassword(data)).toEqual(expectedAction);
    });
    it('shoudl create a set action', () => {
      const dataSet = {
        errors: {
          confirmPassword: 'confirmPassword',
          password: 'password',
        },
        status: 'pending',
      } as {
        errors?: form.ResetPasswordI;
        status?: store.FormStatus;
      };
      const expectedAction = {
        payload: {
          data: dataSet,
        },
        type: RESET_PASSWORD_SET,
      };
      expect(setResetPassword(dataSet)).toEqual(expectedAction);
    });
    it('should fetch resetPassword success', () => {
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
      store.dispatch(fetchResetPassword(data));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${RESET_PASSWORD} Fetch`);
      expect(actions[1].payload).toEqual({
        data: {
          status: 'pending',
        },
      });
      expect(actions[1].type).toEqual(`${RESET_PASSWORD} Set`);
      expect(actions[2].type).toEqual(`${RESET_PASSWORD} ${API_REQUEST}`);
      expect(actions[3].payload).toEqual({
        data: true,
      });
      expect(actions[3].type).toEqual(LOADER_SET);
      expect(actions[4].type).toEqual(`${RESET_PASSWORD} ${API_SUCCESS}`);
      expect(actions[5].payload).toEqual({
        data: {
          status: 'success',
        },
      });
      expect(actions[5].type).toEqual(`${RESET_PASSWORD} Set`);
      expect(actions[6].payload).toEqual({
        data: {
          error: false,
          text: 'you\'re password has been successfully changed.',
        },
      });
      expect(actions[6].type).toEqual(NOTIFICATION_SET);
      expect(actions[7].payload).toEqual({
        data: false,
      });
      expect(actions[7].type).toEqual(LOADER_SET);
    });
    it('should fetch resetPassword with global error', () => {
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
      store.dispatch(fetchResetPassword(data));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${RESET_PASSWORD} Fetch`);
      expect(actions[1].payload).toEqual({
        data: {
          status: 'pending',
        },
      });
      expect(actions[1].type).toEqual(`${RESET_PASSWORD} Set`);
      expect(actions[2].type).toEqual(`${RESET_PASSWORD} ${API_REQUEST}`);
      expect(actions[3].payload).toEqual({
        data: true,
      });
      expect(actions[3].type).toEqual(LOADER_SET);
      expect(actions[4].type).toEqual(`${RESET_PASSWORD} ${API_ERROR}`);
      expect(actions[5].payload).toEqual({
        data: {
          status: 'error',
        },
      });
      expect(actions[5].type).toEqual(`${RESET_PASSWORD} Set`);
      expect(actions[6].payload).toEqual({
        data: {
          error: true,
          text: 'global error',
        },
      });
      expect(actions[6].type).toEqual(NOTIFICATION_SET);
      expect(actions[7].payload).toEqual({
        data: false,
      });
      expect(actions[7].type).toEqual(LOADER_SET);
    });
    it('should fetch resetPassword with field error', () => {
      const passwordError = 'password error';
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
                password: passwordError,
              },
            },
            type: `${payload.meta.entity} ${API_ERROR}`,
          });
        }
      });
      const mockStore = configureStore([...appMiddleware, apiMiddleware]);
      const store = mockStore();
      store.dispatch(fetchResetPassword(data));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${RESET_PASSWORD} Fetch`);
      expect(actions[1].payload).toEqual({
        data: {
          status: 'pending',
        },
      });
      expect(actions[1].type).toEqual(`${RESET_PASSWORD} Set`);
      expect(actions[2].type).toEqual(`${RESET_PASSWORD} ${API_REQUEST}`);
      expect(actions[3].payload).toEqual({
        data: true,
      });
      expect(actions[3].type).toEqual(LOADER_SET);
      expect(actions[4].type).toEqual(`${RESET_PASSWORD} ${API_ERROR}`);
      expect(actions[5].payload).toEqual({
        data: {
          errors: {
            password: passwordError,
          },
          status: 'error',
        },
      });
      expect(actions[5].type).toEqual(`${RESET_PASSWORD} Set`);
      expect(actions[6].payload).toEqual({
        data: false,
      });
      expect(actions[6].type).toEqual(LOADER_SET);
    });
  });
});
