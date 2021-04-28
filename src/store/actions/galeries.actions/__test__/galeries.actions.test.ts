import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  GALERIES,
  GALERIES_FETCH,
  GALERIES_SET,
  NOTIFICATION_SET,
  UI_SET,
  fetchGaleries,
  resetGaleries,
  setGaleries,
  setLoader,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('galeries', () => {
  describe('actions', () => {
    it('should create a fetch action', () => {
      const expectedAction = {
        type: GALERIES_FETCH,
      };
      expect(fetchGaleries()).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            end: false,
            status: 'pending',
            galeries: {},
            page: 1,
          },
        },
        type: GALERIES_SET,
      };
      expect(resetGaleries()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const data = {
        end: true,
        status: 'success',
      } as {
        end?: boolean;
        status?: store.Status;
        galeries?: { [name: string]: GalerieI},
        page?: number
      };
      const expectedAction = {
        payload: { data },
        type: GALERIES_SET,
      };
      expect(setGaleries(data)).toEqual(expectedAction);
    });
    describe('should fetch galeries', () => {
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
                data: [{
                  id: '1',
                  name: 'galerie name',
                }],
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
            galeries: {},
          },
        });
        store.dispatch(fetchGaleries());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIES_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'fetching',
          },
        });
        expect(actions[1].type).toEqual(GALERIES_SET);
        expect(actions[2].type).toEqual(`${GALERIES} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${GALERIES} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            end: true,
            page: 1,
            galeries: {
              1: {
                name: 'galerie name',
              },
            },
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(GALERIES_SET);
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
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore({
          galeries: {
            end: false,
          },
        });
        store.dispatch(fetchGaleries());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIES_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'fetching',
          },
        });
        expect(actions[1].type).toEqual(GALERIES_SET);
        expect(actions[2].type).toEqual(`${GALERIES} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${GALERIES} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            error: true,
            text: globalError,
          },
        });
        expect(actions[5].type).toEqual(NOTIFICATION_SET);
        expect(actions[6].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[6].type).toEqual(GALERIES_SET);
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
