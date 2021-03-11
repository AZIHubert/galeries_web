import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  UPDATE_EMAIL_VALIDATE,
  UPDATE_EMAIL_VALIDATE_PUT,
  UPDATE_EMAIL_VALIDATE_SET,
  UI_SET,
  putUpdateEmailValidate,
  resetUpdateEmailValidate,
  setLoader,
  setUpdateEmailValidate,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('updateEmailValidate', () => {
  describe('actions', () => {
    const data = {
      password: 'password',
      confirmToken: 'confirmToken',
    };
    it('should create a put action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: UPDATE_EMAIL_VALIDATE_PUT,
      };
      expect(putUpdateEmailValidate(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              password: '',
            },
            status: 'pending',
          },
        },
        type: UPDATE_EMAIL_VALIDATE_SET,
      };
      expect(resetUpdateEmailValidate()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const setData = {
        errors: {
          password: 'password error',
        },
        status: 'error',
      } as {
        errors?: form.UpdateEmailI;
        status?: store.Status;
      };
      const expectedAction = {
        payload: {
          data: setData,
        },
        type: UPDATE_EMAIL_VALIDATE_SET,
      };
      expect(setUpdateEmailValidate(setData)).toEqual(expectedAction);
    });
    describe('should put update email', () => {
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
        store.dispatch(putUpdateEmailValidate(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(UPDATE_EMAIL_VALIDATE_PUT);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'putting',
          },
        });
        expect(actions[1].type).toEqual(UPDATE_EMAIL_VALIDATE_SET);
        expect(actions[2].type).toEqual(`${UPDATE_EMAIL_VALIDATE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${UPDATE_EMAIL_VALIDATE} ${API_SUCCESS}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'success',
          },
        });
        expect(actions[5].type).toEqual(UPDATE_EMAIL_VALIDATE_SET);
        expect(actions[6].payload).toEqual({
          data: {
            error: false,
            text: 'Your email has been changed',
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
        store.dispatch(putUpdateEmailValidate(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(UPDATE_EMAIL_VALIDATE_PUT);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'putting',
          },
        });
        expect(actions[1].type).toEqual(UPDATE_EMAIL_VALIDATE_SET);
        expect(actions[2].type).toEqual(`${UPDATE_EMAIL_VALIDATE} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${UPDATE_EMAIL_VALIDATE} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            errors: {
              password: passwordError,
            },
            status: 'error',
          },
        });
        expect(actions[5].type).toEqual(UPDATE_EMAIL_VALIDATE_SET);
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
