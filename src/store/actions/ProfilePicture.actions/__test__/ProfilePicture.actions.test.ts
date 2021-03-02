import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  LOADER_SET,
  NOTIFICATION_SET,
  PROFILE_PICTURE_FETCH,
  PROFILE_PICTURE_SET,
  USER,
  USER_FETCH,
  USER_SET,
  fetchProfilePicture,
  resetProfilePicture,
  setLoader,
  setProfilePicture,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';
import { PROFILE_PICTURE } from '..';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('profilePicture', () => {
  describe('actions', () => {
    const data = new File(['blob'], 'image.png', { type: 'image/png' });
    it('should create a fetch action', () => {
      const expectedAction = {
        payload: { data },
        type: PROFILE_PICTURE_FETCH,
      };
      expect(fetchProfilePicture(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            status: 'pending',
          },
        },
        type: PROFILE_PICTURE_SET,
      };
      expect(resetProfilePicture()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        status: 'pending',
      } as {
        status?: store.FormStatus;
      };
      const expectedAction = {
        payload: { data: setData },
        type: PROFILE_PICTURE_SET,
      };
      expect(setProfilePicture(setData)).toEqual(expectedAction);
    });
    describe('should fetch profilePicture', () => {
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
              payload: { data: {} },
              type: `${payload.meta.entity} ${API_SUCCESS}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(fetchProfilePicture(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(PROFILE_PICTURE_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'pending',
          },
        });
        expect(actions[1].type).toEqual(PROFILE_PICTURE_SET);
        expect(actions[2].type).toEqual(`${PROFILE_PICTURE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(LOADER_SET);
        expect(actions[4].type).toEqual(`${PROFILE_PICTURE} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(PROFILE_PICTURE_SET);
        expect(actions[6].type).toEqual(USER_FETCH);
        expect(actions[7].type).toEqual(`${USER} ${API_REQUEST}`);
        expect(actions[8].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[8].type).toEqual(LOADER_SET);
        expect(actions[9].type).toEqual(`${USER} ${API_SUCCESS}`);
        expect(actions[10].type).toEqual(USER_SET);
        expect(actions[11].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[11].type).toEqual(LOADER_SET);
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
        store.dispatch(fetchProfilePicture(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(PROFILE_PICTURE_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'pending',
          },
        });
        expect(actions[1].type).toEqual(PROFILE_PICTURE_SET);
        expect(actions[2].type).toEqual(`${PROFILE_PICTURE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(LOADER_SET);
        expect(actions[4].type).toEqual(`${PROFILE_PICTURE} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(PROFILE_PICTURE_SET);
        expect(actions[6].type).toEqual(NOTIFICATION_SET);
        expect(actions[7].payload).toEqual({
          data: {
            loading: false,
          },
        });
        expect(actions[7].type).toEqual(LOADER_SET);
      });
    });
  });
});
