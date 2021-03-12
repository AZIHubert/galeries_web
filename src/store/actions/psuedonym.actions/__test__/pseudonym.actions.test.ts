import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  PSEUDONYM,
  PSEUDONYM_PUT,
  PSEUDONYM_SET,
  USER_SET,
  UI_SET,
  putPseudonym,
  resetPseudonym,
  setLoader,
  setPseudonym,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('pseudonym', () => {
  describe('actions', () => {
    const data = {
      pseudonym: 'pseudonym',
    };
    it('should create a put action', () => {
      const expectedAction = {
        payload: { data },
        type: PSEUDONYM_PUT,
      };
      expect(putPseudonym(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              pseudonym: '',
            },
            status: 'pending',
          },
        },
        type: PSEUDONYM_SET,
      };
      expect(resetPseudonym()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        errors: {
          pseudonym: 'pseudonym error',
        },
        status: 'error',
      } as {
        errors: form.PseudonymI;
        status: store.Status;
      };
      const expectedAction = {
        payload: {
          data: setData,
        },
        type: PSEUDONYM_SET,
      };
      expect(setPseudonym(setData)).toEqual(expectedAction);
    });
    describe('should create a put action', () => {
      it('success', () => {
        const pseudonym = 'pseudonym';
        const user = {};
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
              payload: { data: { pseudonym } },
              type: `${payload.meta.entity} ${API_SUCCESS}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore({
          user,
        });
        store.dispatch(putPseudonym(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(PSEUDONYM_PUT);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'putting',
          },
        });
        expect(actions[1].type).toEqual(PSEUDONYM_SET);
        expect(actions[2].type).toEqual(`${PSEUDONYM} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${PSEUDONYM} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            ...user,
            pseudonym,
          },
        });
        expect(actions[5].type).toEqual(USER_SET);
        expect(actions[6].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[6].type).toEqual(PSEUDONYM_SET);
        expect(actions[7].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[7].type).toEqual(UI_SET);
      });
      it('error', () => {
        const pseudonymError = 'pseudonym error';
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
                  pseudonym: pseudonymError,
                },
              },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(
          putPseudonym(data),
        );
        const actions = store.getActions();
        expect(actions[0].type).toEqual(PSEUDONYM_PUT);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'putting',
          },
        });
        expect(actions[1].type).toEqual(PSEUDONYM_SET);
        expect(actions[2].type).toEqual(`${PSEUDONYM} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${PSEUDONYM} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              pseudonym: pseudonymError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(PSEUDONYM_SET);
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
