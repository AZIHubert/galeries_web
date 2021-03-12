import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  LOGOUT,
  LOGOUT_FETCH,
  NOTIFICATION_SET,
  PROFILE_PICTURES_SET,
  UI_SET,
  USER,
  fetchLogout,
  setLoader,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('logout', () => {
  describe('action', () => {
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: { data: null },
        type: LOGOUT_FETCH,
      };
      expect(fetchLogout()).toEqual(expectedAction);
    });
    describe('should fetch logout', () => {
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
        store.dispatch(fetchLogout());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(LOGOUT_FETCH);
        expect(actions[1].type).toEqual(`${LOGOUT} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${LOGOUT} ${API_SUCCESS}`);
        expect(actions[4].payload).toEqual({ data: null });
        expect(actions[4].type).toEqual(`${USER} Set`);
        expect(actions[5].payload).toEqual({
          data: {
            end: false,
            page: 1,
            profilePictures: {},
            status: 'pending',
          },
        });
        expect(actions[5].type).toEqual(PROFILE_PICTURES_SET);
        expect(actions[6].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[6].type).toEqual(UI_SET);
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
          }k;
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchLogout());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(LOGOUT_FETCH);
        expect(actions[1].type).toEqual(`${LOGOUT} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${LOGOUT} ${API_ERROR}`);
        expect(actions[4].payload).toEqual({
          data: {
            error: true,
            text: globalError,
          },
        });
        expect(actions[4].type).toEqual(NOTIFICATION_SET);
        expect(actions[5].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[5].type).toEqual(UI_SET);
      });
    });
  });
});
