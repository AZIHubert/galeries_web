import configureStore from 'redux-mock-store';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

import {
  API_REQUEST,
  API_SUCCESS,
  API_ERROR,
  CONFIRMATION,
  CONFIRMATION_FETCH,
  LOADER_SET,
  NOTIFICATION_SET,
  USER,
  fetchConfirmation,
  setLoader,
} from '#store/actions';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

const setItemSpy = jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');

describe('confirmation', () => {
  describe('action', () => {
    it('should create an fetch action', () => {
      const token = 'token';
      const expectedAction = {
        type: CONFIRMATION_FETCH,
        payload: { data: token },
      };
      expect(fetchConfirmation(token)).toEqual(expectedAction);
    });
    it('should fetch confirmation success', () => {
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
      store.dispatch(fetchConfirmation('token'));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${CONFIRMATION} Fetch`);
      expect(actions[1].type).toEqual(`${CONFIRMATION} ${API_REQUEST}`);
      expect(actions[2].payload).toEqual({ data: true });
      expect(actions[2].type).toEqual(LOADER_SET);
      expect(actions[3].type).toEqual(`${CONFIRMATION} ${API_SUCCESS}`);
      expect(actions[4].type).toEqual(`${USER} Fetch`);
      expect(actions[5].type).toEqual(`${USER} ${API_REQUEST}`);
      expect(actions[6].payload).toEqual({ data: true });
      expect(actions[6].type).toEqual(LOADER_SET);
      expect(actions[7].type).toEqual(`${USER} ${API_SUCCESS}`);
      expect(actions[8].type).toEqual(`${USER} Set`);
      expect(actions[9].type).toEqual(LOADER_SET);
      expect(setItemSpy).toHaveBeenCalledTimes(2);
    });
    it('should fetch confirmation error', async () => {
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
            type: `${payload.meta.entity} ${API_ERROR}`,
          });
        }
      });
      const mockStore = configureStore([...appMiddleware, apiMiddleware]);
      const store = mockStore();
      store.dispatch(fetchConfirmation('token'));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${CONFIRMATION} Fetch`);
      expect(actions[1].type).toEqual(`${CONFIRMATION} ${API_REQUEST}`);
      expect(actions[2].payload).toEqual({ data: true });
      expect(actions[2].type).toEqual(LOADER_SET);
      expect(actions[3].type).toEqual(`${CONFIRMATION} ${API_ERROR}`);
      expect(actions[4].type).toEqual(NOTIFICATION_SET);
      expect(actions[5].type).toEqual(LOADER_SET);
      expect(setItemSpy).toHaveBeenCalledTimes(0);
    });
  });
});
