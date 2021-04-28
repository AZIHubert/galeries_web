import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  GALERIE,
  GALERIE_FETCH,
  GALERIE_POST,
  GALERIE_SET,
  GALERIES_SET,
  NOTIFICATION_SET,
  UI_SET,
  fetchGalerie,
  postGalerie,
  resetGalerie,
  setGalerie,
  setLoader,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('galerie', () => {
  describe('actions', () => {
    const data = {
      name: 'galerie name',
    };
    const fetchData = {
      id: '1',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: { data: fetchData },
        type: GALERIE_FETCH,
      };
      expect(fetchGalerie(fetchData)).toEqual(expectedAction);
    });
    it('should create a post action', () => {
      const expectedAction = {
        payload: { data },
        type: GALERIE_POST,
      };
      expect(postGalerie(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              name: '',
            },
            status: 'pending',
          },
        },
        type: GALERIE_SET,
      };
      expect(resetGalerie()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        status: 'error',
        errors: {
          name: 'name error',
        },
      } as {
        status?: store.Status;
        errors?: {
          name?: string;
        }
      };
      const expectedAction = {
        payload: { data: setData },
        type: GALERIE_SET,
      };
      expect(setGalerie(setData)).toEqual(expectedAction);
    });
    describe('should post galerie', () => {
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
                  galerie: {
                    id: '1',
                    name: 'galerie name',
                  },
                  type: 'POST',
                },
              },
              type: `${payload.meta.entity} ${API_SUCCESS}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore({
          galeries: {
            galeries: {},
          },
        });
        store.dispatch(postGalerie(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIE_POST);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(GALERIE_SET);
        expect(actions[2].type).toEqual(`${GALERIE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${GALERIE} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            galeries: {
              1: {
                id: '1',
                name: 'galerie name',
              },
            },
          },
        });
        expect(actions[5].type).toEqual(GALERIES_SET);
        expect(actions[6].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[6].type).toEqual(GALERIE_SET);
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
        store.dispatch(postGalerie(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIE_POST);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(GALERIE_SET);
        expect(actions[2].type).toEqual(`${GALERIE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${GALERIE} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(GALERIE_SET);
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
    describe('it should get galerie', () => {
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
                  galerie: {
                    id: '1',
                    name: 'galerie name',
                  },
                  type: 'GET',
                },
              },
              type: `${payload.meta.entity} ${API_SUCCESS}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore({
          galeries: {
            galeries: {},
          },
        });
        store.dispatch(fetchGalerie(fetchData));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIE_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'fetching',
          },
        });
        expect(actions[1].type).toEqual(GALERIE_SET);
        expect(actions[2].type).toEqual(`${GALERIE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${GALERIE} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            galeries: {
              1: {
                id: '1',
                name: 'galerie name',
              },
            },
          },
        });
        expect(actions[5].type).toEqual(GALERIES_SET);
        expect(actions[6].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[6].type).toEqual(GALERIE_SET);
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
        store.dispatch(fetchGalerie(fetchData));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(GALERIE_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'fetching',
          },
        });
        expect(actions[1].type).toEqual(GALERIE_SET);
        expect(actions[2].type).toEqual(`${GALERIE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${GALERIE} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(GALERIE_SET);
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
