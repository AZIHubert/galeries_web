import {
  API_ERROR,
  API_REQUEST,
  API_SUCCESS,
  apiError,
  apiRequest,
  apiSuccess,
} from '#store/actions';

const mockApi = jest.fn();

jest.mock('#store/middlewares/core/api.middlewares', () => mockApi);

describe('api', () => {
  describe('action', () => {
    it('should create an apiError action', () => {
      const entity = 'user';
      const error = 'error';
      const expectedAction = {
        payload: {
          data: error,
          meta: {
            entity,
          },
        },
        type: `${entity} ${API_ERROR}`,
      };
      expect(apiError(error, entity)).toEqual(expectedAction);
    });
    it('should create an apiRequest action', () => {
      const body = 'body';
      const method = 'POST';
      const url = '/url';
      const entity = 'user';
      const confirmToken = 'token';
      const expectedAction = {
        payload: {
          data: body,
          meta: {
            confirmToken,
            entity,
            method,
            url,
          },
        },
        type: `${entity} ${API_REQUEST}`,
      };
      expect(apiRequest(
        body,
        method,
        url,
        entity,
        confirmToken,
      )).toEqual(expectedAction);
    });
    it('should create an apiSuccess action', () => {
      const response = {
        data: 'data',
        status: 200,
        statusText: 'statusText',
        headers: 'headers',
        config: {},
      };
      const entity = 'user';
      const expectedAction = {
        payload: {
          data: response,
          meta: {
            entity,
          },
        },
        type: `${entity} ${API_SUCCESS}`,
      };
      expect(apiSuccess(response, entity)).toEqual(expectedAction);
    });
  });
});
