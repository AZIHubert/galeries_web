import configureStore from 'redux-mock-store';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

import {
  API_REQUEST,
  API_SUCCESS,
  API_ERROR,
  CONFIRMATION,
  CONFIRMATION_FETCH,
  NOTIFICATION_SET,
  PROFILE_PICTURE_SET,
  UI_SET,
  USER,
  USER_FETCH,
  USER_SET,
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
    describe('should fetch confirmation', () => {
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
        store.dispatch(fetchConfirmation('token'));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(CONFIRMATION_FETCH);
        expect(actions[1].type).toEqual(`${CONFIRMATION} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${CONFIRMATION} ${API_SUCCESS}`);
        expect(actions[4].type).toEqual(USER_FETCH);
        expect(actions[5].type).toEqual(`${USER} ${API_REQUEST}`);
        expect(actions[6].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[6].type).toEqual(UI_SET);
        expect(actions[7].type).toEqual(`${USER} ${API_SUCCESS}`);
        expect(actions[8].type).toEqual(USER_SET);
        expect(actions[9].type).toEqual(PROFILE_PICTURE_SET);
        expect(actions[10].payload).toEqual({
          data: {
            init: false,
          },
        });
        expect(actions[10].type).toEqual(UI_SET);
        expect(actions[11].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[11].type).toEqual(UI_SET);
        expect(setItemSpy).toHaveBeenCalledTimes(2);
      });
      it('error', async () => {
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
        expect(actions[0].type).toEqual(CONFIRMATION_FETCH);
        expect(actions[1].type).toEqual(`${CONFIRMATION} ${API_REQUEST}`);
        expect(actions[2].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[2].type).toEqual(UI_SET);
        expect(actions[3].type).toEqual(`${CONFIRMATION} ${API_ERROR}`);
        expect(actions[4].type).toEqual(NOTIFICATION_SET);
        expect(actions[5].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[5].type).toEqual(UI_SET);
        expect(setItemSpy).toHaveBeenCalledTimes(0);
      });
    });
  });
});
