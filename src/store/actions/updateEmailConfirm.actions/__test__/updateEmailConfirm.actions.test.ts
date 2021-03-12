import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  UI_SET,
  UPDATE_EMAIL_CONFIRM,
  UPDATE_EMAIL_CONFIRM_POST,
  UPDATE_EMAIL_CONFIRM_SET,
  postUpdateEmailConfirm,
  resetUpdateEmailConfirm,
  setLoader,
  setUpdateEmailConfirm,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('updateEmailConfirm', () => {
  describe('actions', () => {
    const data = {
      email: 'email',
      password: 'password',
      confirmToken: 'confirmToken',
    };
    it('should create a post action', () => {
      const expectedAction = {
        payload: { data },
        type: UPDATE_EMAIL_CONFIRM_POST,
      };
      expect(postUpdateEmailConfirm(data)).toEqual(expectedAction);
    });
    it('should create a reset actions', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              email: '',
              password: '',
            },
            status: 'pending',
          },
        },
        type: UPDATE_EMAIL_CONFIRM_SET,
      };
      expect(resetUpdateEmailConfirm()).toEqual(expectedAction);
    });
    it('should create a set actions', () => {
      const setData = {
        errors: {
          email: 'email error',
          password: 'password error',
        },
        status: 'error',
      } as {
        errors?: form.ChangeEmailConfirmI;
        status?: store.Status
      };
      const expectedAction = {
        payload: { data: setData },
        type: UPDATE_EMAIL_CONFIRM_SET,
      };
      expect(setUpdateEmailConfirm(setData)).toEqual(expectedAction);
    });
    describe('should post update email confirm', () => {
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
        store.dispatch(postUpdateEmailConfirm(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(UPDATE_EMAIL_CONFIRM_POST);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(UPDATE_EMAIL_CONFIRM_SET);
        expect(actions[2].type).toEqual(`${UPDATE_EMAIL_CONFIRM} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${UPDATE_EMAIL_CONFIRM} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(UPDATE_EMAIL_CONFIRM_SET);
        expect(actions[6].payload).toEqual({
          data: {
            error: false,
            text: 'an email has been sent to the email address you register',
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
      it('error', () => {
        const passwordError = 'password error';
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
                  password: passwordError,
                },
              },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(postUpdateEmailConfirm(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(UPDATE_EMAIL_CONFIRM_POST);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'posting',
          },
        });
        expect(actions[1].type).toEqual(UPDATE_EMAIL_CONFIRM_SET);
        expect(actions[2].type).toEqual(`${UPDATE_EMAIL_CONFIRM} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${UPDATE_EMAIL_CONFIRM} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              password: passwordError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(UPDATE_EMAIL_CONFIRM_SET);
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
