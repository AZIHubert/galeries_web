import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  FRAMES,
  FRAMES_FETCH,
  GALERIES_SET,
  NOTIFICATION_SET,
  UI_SET,
  fetchFrames,
  setLoader,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('frames', () => {
  describe('actions', () => {
    const data = {
      galerieId: '1',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: { data },
        type: FRAMES_FETCH,
      };
      expect(fetchFrames(data)).toEqual(expectedAction);
    });
    describe('it should fetch frames', () => {
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
                  galerieId: '1',
                  frames: [{
                    id: '1',
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
            galeries: {
              1: {
                name: 'galerie name',
                frames: {
                  frames: {},
                  page: 1,
                },
              },
            },
          },
        });
        store.dispatch(fetchFrames(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(FRAMES_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            galeries: {
              1: {
                name: 'galerie name',
                frames: {
                  frames: {},
                  page: 1,
                  status: 'fetching',
                },
              },
            },
          },
        });
        expect(actions[1].type).toEqual(GALERIES_SET);
        expect(actions[2].type).toEqual(`${FRAMES} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${FRAMES} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            galeries: {
              1: {
                name: 'galerie name',
                frames: {
                  end: true,
                  page: 2,
                  frames: {
                    1: {
                      id: '1',
                    },
                  },
                  status: 'success',
                },
              },
            },
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
            galeries: {
              1: {
                name: 'galerie name',
                frames: {
                  frames: {},
                  page: 1,
                },
              },
            },
          },
        });
        store.dispatch(fetchFrames(data));
        const actions = store.getActions();
        expect(actions[1].type).toEqual(GALERIES_SET);
        expect(actions[2].type).toEqual(`${FRAMES} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${FRAMES} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            error: true,
            text: globalError,
          },
        });
        expect(actions[5].type).toEqual(NOTIFICATION_SET);
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
