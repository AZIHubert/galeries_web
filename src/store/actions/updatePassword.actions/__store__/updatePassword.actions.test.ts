import configureStore from 'redux-mock-store';

import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  NOTIFICATION_SET,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_PUT,
  UPDATE_PASSWORD_SET,
  UI_SET,
  putUpdatePassword,
  resetUpdatePassword,
  setLoader,
  setUpdatePassword,
} from '#store/actions';
import { appMiddleware } from '#store/middlewares';
import apiMiddleware from '#store/middlewares/core/api.middlewares';

jest.mock('#store/middlewares/core/api.middlewares', () => jest.fn());

describe('updatePassword', () => {
  describe('actions', () => {
    const data = {
      confirmNewPassword: 'confirmNewPassword',
      currentPassword: 'currentPassword',
      newPassword: 'newPassword',
    };
    it('should create a put action', () => {
      const expectedAction = {
        payload: {
          data,
        },
        type: UPDATE_PASSWORD_PUT,
      };
      expect(putUpdatePassword(data)).toEqual(expectedAction);
    });
    it('should create a reset action', () => {
      const expectedAction = {
        payload: {
          data: {
            errors: {
              confirmNewPassword: '',
              currentPassword: '',
              newPassword: '',
            },
            status: 'pending',
          },
        },
        type: UPDATE_PASSWORD_SET,
      };
      expect(resetUpdatePassword()).toEqual(expectedAction);
    });
    it('should create a set action', () => {
      const errorData = {
        errors: {
          confirmNewPassword: 'confirmNewPassword',
          currentPassword: 'currentPassword',
          newPassword: 'newPassword',
        },
        status: 'success',
      } as {
        errors?: form.UpdatePasswordI;
        status?: store.Status;
      };
      const expectedAction = {
        payload: {
          data: errorData,
        },
        type: UPDATE_PASSWORD_SET,
      };
      expect(setUpdatePassword(errorData)).toEqual(expectedAction);
    });
    describe('should put update password', () => {
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
        store.dispatch(putUpdatePassword(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(UPDATE_PASSWORD_PUT);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'putting',
          },
        });
        expect(actions[1].type).toEqual(UPDATE_PASSWORD_SET);
        expect(actions[2].type).toEqual(`${UPDATE_PASSWORD} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${UPDATE_PASSWORD} ${API_SUCCESS}`);
        expect(actions[5].type).toEqual(UPDATE_PASSWORD_SET);
        expect(actions[6].payload).toEqual({
          data: {
            error: false,
            text: 'you\'re password has been modify successfully',
          },
        });
        expect(actions[6].type).toEqual(NOTIFICATION_SET);
      });
      it('error', () => {
        const confirmNewPasswordError = 'confirm new password error';
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
                  confirmNewPassword: confirmNewPasswordError,
                },
              },
              type: `${payload.meta.entity} ${API_ERROR}`,
            });
          }
        });
        const mockStore = configureStore([...appMiddleware, apiMiddleware]);
        const store = mockStore();
        store.dispatch(putUpdatePassword(data));
        const actions = store.getActions();
        expect(actions[0].type).toEqual(UPDATE_PASSWORD_PUT);
        expect(actions[1].payload).toEqual({
          data: {
            status: 'putting',
          },
        });
        expect(actions[1].type).toEqual(UPDATE_PASSWORD_SET);
        expect(actions[2].type).toEqual(`${UPDATE_PASSWORD} ${API_REQUEST}`);
        expect(actions[3].payload).toEqual({
          data: {
            loading: true,
          },
        });
        expect(actions[3].type).toEqual(UI_SET);
        expect(actions[4].type).toEqual(`${UPDATE_PASSWORD} ${API_ERROR}`);
        expect(actions[5].payload).toEqual({
          data: {
            status: 'error',
            errors: {
              confirmNewPassword: confirmNewPasswordError,
            },
          },
        });
        expect(actions[5].type).toEqual(UPDATE_PASSWORD_SET);
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
