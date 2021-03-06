import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  PROFILE_PICTURE_SET,
  UI_SET,
  USER,
  USER_FETCH,
  USER_SET,
  fetchUser,
  setLoader,
  setUser,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('user', () => {
  describe('actions', () => {
    it('should create a fetch user', () => {
      const expectedAction = {
        payload: { data: undefined },
        type: USER_FETCH,
      };
      expect(fetchUser()).toEqual(expectedAction);
    });
    it('should create a set user', () => {
      const expectedAction = {
        payload: {
          data: null,
        },
        type: USER_SET,
      };
      expect(setUser(null)).toEqual(expectedAction);
    });
    describe('should fetch user', () => {
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
        store.dispatch(fetchUser());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(USER_FETCH);
        expect(actions[1].type).toEqual(`${USER} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${USER} ${API_SUCCESS}`);
        expect(actions[4].type).toEqual(USER_SET);
        expect(actions[5].type).toEqual(PROFILE_PICTURE_SET);
        expect(actions[6].payload).toEqual({
          data: {
            init: false,
          },
        });
        expect(actions[6].type).toEqual(UI_SET);
        expect(actions[7].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[7].type).toEqual(UI_SET);
      });
      it('error', () => {
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
        store.dispatch(fetchUser());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(USER_FETCH);
        expect(actions[1].type).toEqual(`${USER} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${USER} ${API_ERROR}`);
        expect(actions[4].payload).toEqual({
          data: {
            error: true,
            text: globalError,
          },
        });
        expect(actions[4].type).toEqual(NOTIFICATION_SET);
        expect(actions[5].payload).toEqual({
          data: {
            init: false,
          },
        });
        expect(actions[5].type).toEqual(UI_SET);
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
