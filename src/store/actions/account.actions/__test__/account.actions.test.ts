import configureStore from 'redux-mock-store';

import {
  ACCOUNT,
  ACCOUNT_DELETE,
  ACCOUNT_SET,
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  PROFILE_PICTURES_SET,
  USER_SET,
  UI_SET,
  deleteAccount,
  resetAccount,
  setAccount,
  setLoader,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('account', () => {
  describe('action', () => {
    const data = {
      deleteAccountSentence: 'deleteAccountSentence',
      password: 'password',
      userNameOrEmail: 'userNameOrEmail',
    };
    it('should create a delete action', () => {
      const expectedAction = {
        payload: { data },
        type: ACCOUNT_DELETE,
      };
      expect(deleteAccount(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              deleteAccountSentence: '',
              password: '',
              userNameOrEmail: '',
            },
            status: 'pending',
          },
        },
        type: ACCOUNT_SET,
      };
      expect(resetAccount()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        errors: {
          deleteAccountSentence: 'deleteAccountSentence error',
          password: 'password error',
          userNameOrEmail: 'userNameOrEmail error',
        },
        status: 'error',
      } as {
        errors?: form.AccountI;
        status?: store.Status;
      };
      const expectedAction = {
        payload: {
          data: setData,
        },
        type: ACCOUNT_SET,
      };
      expect(setAccount(setData)).toEqual(expectedAction);
    });
    describe('should delete account', () => {
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
        store.dispatch(deleteAccount(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(ACCOUNT_DELETE);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'delete',
          },
        });
        expect(actions[1].type).toEqual(ACCOUNT_SET);
        expect(actions[2].type).toEqual(`${ACCOUNT} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${ACCOUNT} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: null,
        });
        expect(actions[5].type).toEqual(USER_SET);
        expect(actions[6].payload).toEqual({
          data: {
            end: false,
            status: 'pending',
            profilePictures: {},
            page: 1,
          },
        });
        expect(actions[6].type).toEqual(PROFILE_PICTURES_SET);
        expect(actions[7].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[7].type).toEqual(UI_SET);
      });
      it('success', () => {
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
        store.dispatch(deleteAccount(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(ACCOUNT_DELETE);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'delete',
          },
        });
        expect(actions[1].type).toEqual(ACCOUNT_SET);
        expect(actions[2].type).toEqual(`${ACCOUNT} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${ACCOUNT} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(ACCOUNT_SET);
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
