import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  SEND_CONFIRMATION,
  SEND_CONFIRMATION_FETCH,
  SEND_CONFIRMATION_SET,
  SIGNIN,
  SIGNIN_FETCH,
  SIGNIN_SET,
  UI_SET,
  fetchSignin,
  resetSignin,
  setLoader,
  setSignin,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('signin', () => {
  describe('action', () => {
    const data = {
      confirmPassword: 'confirmPassword',
      email: 'email',
      password: 'password',
      userName: 'userName',
    };
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              confirmPassword: '',
              email: '',
              password: '',
              userName: '',
            },
            status: 'pending',
          },
        },
        type: SIGNIN_SET,
      };
      expect(resetSignin()).toEqual(expectedAction);
    });
    it('should create fetch action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: SIGNIN_FETCH,
      };
      expect(fetchSignin(data)).toEqual(expectedAction);
    });
    it('should create set action', () => {
      const setData = {
        errors: data,
        status: 'pending',
      } as {
        errors?: form.SigninI
        status?: store.Status;
      };
      const expectedAction = {
        payload: {
          data: setData,
        },
        type: SIGNIN_SET,
      };
      expect(setSignin(setData)).toEqual(expectedAction);
    });
    describe('should fetch signin', () => {
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
        store.dispatch(fetchSignin(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SIGNIN_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SIGNIN_SET);
        expect(actions[2].type).toEqual(`${SIGNIN} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SIGNIN} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(SIGNIN_SET);
        expect(actions[6].type).toEqual(SEND_CONFIRMATION_FETCH);
        expect(actions[7].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[7].type).toEqual(SEND_CONFIRMATION_SET);
        expect(actions[8].type).toEqual(`${SEND_CONFIRMATION} ${API_REQUEST}`);
        expect(actions[9].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[9].type).toEqual(UI_SET);
        expect(actions[10].type).toEqual(`${SEND_CONFIRMATION} ${API_SUCCESS}`);
        expect(actions[11].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[11].type).toEqual(SEND_CONFIRMATION_SET);
        expect(actions[12].payload).toEqual({
          data: {
            error: false,
            text: 'an email has been sent to you',
          },
        });
        expect(actions[12].type).toEqual(NOTIFICATION_SET);
        expect(actions[13].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[13].type).toEqual(UI_SET);
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
        store.dispatch(fetchSignin(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SIGNIN_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SIGNIN_SET);
        expect(actions[2].type).toEqual(`${SIGNIN} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SIGNIN} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SIGNIN_SET);
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
        const userNameError = 'user name error';
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
                  userName: userNameError,
                },
              },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchSignin(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(SIGNIN_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(SIGNIN_SET);
        expect(actions[2].type).toEqual(`${SIGNIN} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${SIGNIN} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              userName: userNameError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(SIGNIN_SET);
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
