import {
  AxiosResponse,
  Method,
} from 'axios';

export const API_ERROR = 'API_ERROR';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';

export const apiError: (
  error: string,
  entity: store.Entity,
) => store.ActionI = (
  error,
  entity,
) => ({
  payload: {
    data: error,
    meta: {
      entity,
    },
  },
  type: `${entity} ${API_ERROR}`,
});

export const apiRequest: (
  body: any,
  method: Method,
  url: string,
  entity: store.Entity,
  confirmToken?: string,
) => store.ActionI = (
  body,
  method,
  url,
  entity,
  confirmToken?,
) => ({
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
});

export const apiSuccess: (
  response: AxiosResponse,
  entity: store.Entity,
) => store.ActionI = (
  response,
  entity,
) => ({
  payload: {
    data: response,
    meta: {
      entity,
    },
  },
  type: `${entity} ${API_SUCCESS}`,
});
