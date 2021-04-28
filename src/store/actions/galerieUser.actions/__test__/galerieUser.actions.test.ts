import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  GALERIE_USERS,
  GALERIE_USERS_FETCH,
  GALERIE_USERS_SET,
  GALERIES_SET,
  NOTIFICATION_SET,
  UI_SET,
  fetchGalerieUsers,
  setGalerieUsers,
  setLoader,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('galerie users', () => {
  describe('action', () => {
    const data = {
      id: '1',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: { data },
        type: GALERIE_USERS_FETCH,
      };
      expect(fetchGalerieUsers(data)).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        id: '1',
        users: [],
      };
      const expectedAction = {
        payload: { data: setData },
        type: GALERIE_USERS_SET,
      };
      expect(setGalerieUsers(setData)).toEqual(expectedAction);
    });
    describe('should fetch galerie users', () => {
      it('success', () => {
        (apiMiddleware as jest.Mock).mockImplementation((
          { dispatch },
        ) => (
          next: Function,
        ) => (
          action: any,
        ) => {
          const {
            payload,
            type,
          } = action;
          next(action);
          if (type.includes(API_REQUEST)) {
            dispatch(setLoader(true));
            dispatch({
              payload: {
                data: {
                  id: '1',
                  users: [{
                    userName: 'user name',
                  }],
                },
              },
              type: `${payload.meta.entity} ${API_SUCCESS}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore({
          galeries: {
            end: false,
            page: 0,
            galeries: {
              1: {},
            },
          },
        });
        store.dispatch(fetchGalerieUsers(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIE_USERS_FETCH);
        expect(actions[1].type).toEqual(`${GALERIE_USERS} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${GALERIE_USERS} ${API_SUCCESS}`);
        expect(actions[4].payload).toEqual({
          data: {
            galeries: {
              1: {
                users: [{
                  userName: 'user name',
                }],
              },
            },
          },
        });
        expect(actions[4].type).toEqual(GALERIES_SET);
        expect(actions[5].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[5].type).toEqual(UI_SET);
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
        const store = mockStore({
          galeries: {
            end: false,
            page: 0,
            galeries: {
              1: {},
            },
          },
        });
        store.dispatch(fetchGalerieUsers(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIE_USERS_FETCH);
        expect(actions[1].type).toEqual(`${GALERIE_USERS} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${GALERIE_USERS} ${API_ERROR}`);
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
