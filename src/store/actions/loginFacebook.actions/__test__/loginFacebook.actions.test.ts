import {
  ReactFacebookLoginInfo,
  ReactFacebookFailureResponse,
} from 'react-facebook-login';
import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  LOADER_SET,
  LOGIN_FACEBOOK,
  LOGIN_FACEBOOK_FETCH,
  NOTIFICATION_SET,
  USER,
  fetchLoginFacebook,
  setLoader,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('loginFacebook', () => {
  describe('action', () => {
    const data = {
      userId: 'userId',
      accessToken: 'accessToken',
      name: 'name',
      email: 'email',
      picture: {
        data: {
          height: 1,
          is_silhouette: true,
          url: 'url',
          width: 1,
        },
      },
    } as ReactFacebookLoginInfo | ReactFacebookFailureResponse;
    it('should create a fetch action', () => {
      const expectedAction = {
        type: LOGIN_FACEBOOK_FETCH,
        payload: {
          data,
        },
      };
      expect(fetchLoginFacebook(data)).toEqual(expectedAction);
    });
    it('should fetch loginFacebook success', () => {
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
      store.dispatch(fetchLoginFacebook(data));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${LOGIN_FACEBOOK} Fetch`);
      expect(actions[1].type).toEqual(`${LOGIN_FACEBOOK} ${API_REQUEST}`);
      expect(actions[2].payload).toEqual({ data: true });
      expect(actions[2].type).toEqual(LOADER_SET);
      expect(actions[3].type).toEqual(`${LOGIN_FACEBOOK} ${API_SUCCESS}`);
      expect(actions[4].type).toEqual(`${USER} Fetch`);
      expect(actions[5].type).toEqual(`${USER} ${API_REQUEST}`);
      expect(actions[6].payload).toEqual({ data: true });
      expect(actions[6].type).toEqual(LOADER_SET);
      expect(actions[7].type).toEqual(`${USER} ${API_SUCCESS}`);
      expect(actions[8].type).toEqual(`${USER} Set`);
      expect(actions[9].payload).toEqual({ data: false });
      expect(actions[9].type).toEqual(LOADER_SET);
    });
    it('should fetch loginFacebook error', () => {
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
      store.dispatch(fetchLoginFacebook(data));
      const actions = store.getActions();
      expect(actions[0].type).toEqual(`${LOGIN_FACEBOOK} Fetch`);
      expect(actions[1].type).toEqual(`${LOGIN_FACEBOOK} ${API_REQUEST}`);
      expect(actions[2].payload).toEqual({ data: true });
      expect(actions[2].type).toEqual(LOADER_SET);
      expect(actions[3].type).toEqual(`${LOGIN_FACEBOOK} ${API_ERROR}`);
      expect(actions[3].type).toEqual(`${LOGIN_FACEBOOK} ${API_ERROR}`);
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
