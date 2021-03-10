import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  PROFILE_PICTURES,
  PROFILE_PICTURES_FETCH,
  PROFILE_PICTURES_SET,
  UI_SET,
  fetchProfilePictures,
  resetProfilePictures,
  setLoader,
  setProfilePictures,
} from '#store/actions';

import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('profilePictures', () => {
  describe('action', () => {
    it('should create a fetch action', () => {
      const expectedAction = {
        type: PROFILE_PICTURES_FETCH,
      };
      expect(fetchProfilePictures()).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            end: false,
            status: 'pending',
            profilePictures: {},
            page: 1,
          },
        },
        type: PROFILE_PICTURES_SET,
      };
      expect(resetProfilePictures()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const data = {
        end: true,
        profilePictures: {},
        status: 'pending',
        page: 4,
      } as {
        profilePictures: { [name: string]: ProfilePictureI };
        status: store.Status;
      };
      const expectedAction = {
        payload: {
          data,
        },
        type: PROFILE_PICTURES_SET,
      };
      expect(setProfilePictures(data)).toEqual(expectedAction);
    });
    describe('should fetch profilePictures', () => {
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
              type: `${payload.meta.entity} ${API_SUCCESS}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore({
          profilePictures: {
            end: false,
            page: 0,
            profilePictures: {},
          },
        });
        store.dispatch(fetchProfilePictures());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(PROFILE_PICTURES_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'fetching',
          },
        });
        expect(actions[1].type).toEqual(PROFILE_PICTURES_SET);
        expect(actions[2].type).toEqual(`${PROFILE_PICTURES} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${PROFILE_PICTURES} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            end: true,
            page: 1,
            profilePictures: {},
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(PROFILE_PICTURES_SET);
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
          profilePictures: {
            end: false,
          },
        });
        store.dispatch(fetchProfilePictures());
        const actions = store.getActions();
        expect(actions[0].type).toEqual(PROFILE_PICTURES_FETCH);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'fetching',
          },
        });
        expect(actions[1].type).toEqual(PROFILE_PICTURES_SET);
        expect(actions[2].type).toEqual(`${PROFILE_PICTURES} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${PROFILE_PICTURES} ${API_ERROR}`);
        expect(actions[5].type).toEqual(NOTIFICATION_SET);
        expect(actions[6].payload).toEqual({
          data: {
            status: 'error',
          },
        });
        expect(actions[6].type).toEqual(PROFILE_PICTURES_SET);
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
