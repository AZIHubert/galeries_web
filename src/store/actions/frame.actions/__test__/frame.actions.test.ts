import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  FRAME,
  FRAME_POST,
  FRAME_SET,
  GALERIES_SET,
  NOTIFICATION_SET,
  UI_SET,
  postFrame,
  resetFrame,
  setFrame,
  setLoader,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('frame', () => {
  describe('actions', () => {
    const data = {
      images: new FormData(),
      galerieId: '1',
    };
    it('should create a post action', () => {
      const expectedAction = {
        payload: { data },
        type: FRAME_POST,
      };
      expect(postFrame(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            status: 'pending',
          },
        },
        type: FRAME_SET,
      };
      expect(resetFrame()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        status: 'success',
      } as {
        status: store.Status;
      };
      const expectedAction = {
        payload: { data: setData },
        type: FRAME_SET,
      };
      expect(setFrame(setData)).toEqual(expectedAction);
    });
    describe('it should post frame', () => {
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
                  type: 'POST',
                  galerieId: '1',
                  frame: {
                    id: '1',
                  },
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
                frames: [],
              },
            },
          },
        });
        store.dispatch(postFrame(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(FRAME_POST);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(FRAME_SET);
        expect(actions[2].type).toEqual(`${FRAME} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${FRAME} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            galeries: {
              1: {
                frames: [
                  {
                    id: '1',
                  },
                ],
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
        expect(actions[6].type).toEqual(FRAME_SET);
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
        store.dispatch(postFrame(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(FRAME_POST);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(FRAME_SET);
        expect(actions[2].type).toEqual(`${FRAME} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${FRAME} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(FRAME_SET);
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
