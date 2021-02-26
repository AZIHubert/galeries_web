import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  LOADER_SET,
  LOGIN_GOOGLE,
  LOGIN_GOOGLE_FETCH,
  NOTIFICATION_SET,
  USER,
  fetchLoginGoogle,
  setLoader,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('loginGoogle', () => {
  describe('actions', () => {
    const data = {
      email: 'email',
      id: 'id',
      imageUrl: 'imageUrl',
      name: 'name',
    };
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: LOGIN_GOOGLE_FETCH,
      };
      expect(fetchLoginGoogle(data)).toEqual(expectedAction);
    });
    it('should fetch loginGoogle success', () => {
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
      store.dispatch(fetchLoginGoogle(data));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${LOGIN_GOOGLE} Fetch`);
      expect(actions[1].type).toEqual(`${LOGIN_GOOGLE} ${API_REQUEST}`);
      expect(actions[2].payload).toEqual({ data: true });
      expect(actions[2].type).toEqual(LOADER_SET);
      expect(actions[3].type).toEqual(`${LOGIN_GOOGLE} ${API_SUCCESS}`);
      expect(actions[4].type).toEqual(`${USER} Fetch`);
      expect(actions[5].type).toEqual(`${USER} ${API_REQUEST}`);
      expect(actions[6].payload).toEqual({ data: true });
      expect(actions[6].type).toEqual(LOADER_SET);
      expect(actions[7].type).toEqual(`${USER} ${API_SUCCESS}`);
      expect(actions[8].type).toEqual(`${USER} Set`);
      expect(actions[9].payload).toEqual({ data: false });
      expect(actions[9].type).toEqual(LOADER_SET);
    });
    it('should fetch loginGoogle success', () => {
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
      store.dispatch(fetchLoginGoogle(data));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${LOGIN_GOOGLE} Fetch`);
      expect(actions[1].type).toEqual(`${LOGIN_GOOGLE} ${API_REQUEST}`);
      expect(actions[2].payload).toEqual({ data: true });
      expect(actions[2].type).toEqual(LOADER_SET);
      expect(actions[3].type).toEqual(`${LOGIN_GOOGLE} ${API_ERROR}`);
      expect(actions[4].payload).toEqual({
        data: {
          error: true,
          text: globalError,
        },
      });
      expect(actions[4].type).toEqual(NOTIFICATION_SET);
      expect(actions[5].payload).toEqual({ data: false });
      expect(actions[5].type).toEqual(LOADER_SET);
    });
  });
});
