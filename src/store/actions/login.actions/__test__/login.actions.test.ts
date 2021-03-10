import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  LOGIN,
  LOGIN_FETCH,
  LOGIN_SET,
  NOTIFICATION_SET,
  PROFILE_PICTURE_SET,
  UI_SET,
  USER,
  USER_FETCH,
  USER_SET,
  fetchLogin,
  resetLogin,
  setLoader,
  setLogin,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('login', () => {
  describe('action', () => {
    it('should create a fetch action', () => {
      const data = {
        password: 'password',
        userNameOrEmail: 'userNameOrEmail',
      };
      const expectedAction = {
        type: LOGIN_FETCH,
        payload: { data },
      };
      expect(fetchLogin(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              password: '',
              userNameOrEmail: '',
            },
            status: 'pending',
          },
        },
        type: LOGIN_SET,
      };
      expect(resetLogin()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const data = {
        errors: {
          password: 'password',
          userNameOrEmail: 'userNameOrEmail',
        },
        status: 'pending',
      } as {
        errors?: form.LoginI,
        status?: store.Status
      };
      const exptectedAction = {
        type: LOGIN_SET,
        payload: { data },
      };
      expect(setLogin(data)).toEqual(exptectedAction);
    });
    describe('should fetch login', () => {
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
        store.dispatch(fetchLogin({
          password: 'password',
          userNameOrEmail: 'userNameOrEmail',
        }));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(LOGIN_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(LOGIN_SET);
        expect(actions[2].type).toEqual(`${LOGIN} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${LOGIN} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(LOGIN_SET);
        expect(actions[6].type).toEqual(USER_FETCH);
        expect(actions[7].type).toEqual(`${USER} ${API_REQUEST}`);
        expect(actions[8].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[8].type).toEqual(UI_SET);
        expect(actions[9].type).toEqual(`${USER} ${API_SUCCESS}`);
        expect(actions[10].type).toEqual(USER_SET);
        expect(actions[11].type).toEqual(PROFILE_PICTURE_SET);
        expect(actions[12].payload).toEqual({
          data: {
            init: false,
          },
        });
        expect(actions[12].type).toEqual(UI_SET);
        expect(actions[13].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[13].type).toEqual(UI_SET);
      });
      it('with field error', () => {
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
        store.dispatch(fetchLogin({
          password: 'password',
          userNameOrEmail: 'userNameOrEmail',
        }));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(LOGIN_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(LOGIN_SET);
        expect(actions[2].type).toEqual(`${LOGIN} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${LOGIN} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              password: passwordError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(LOGIN_SET);
        expect(actions[6].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[6].type).toEqual(UI_SET);
      });
      it('should fetch login error with global error', () => {
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
              payload: {
                data: globalError,
              },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchLogin({
          password: 'password',
          userNameOrEmail: 'userNameOrEmail',
        }));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(LOGIN_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(LOGIN_SET);
        expect(actions[2].type).toEqual(`${LOGIN} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${LOGIN} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(LOGIN_SET);
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
    });
  });
});
