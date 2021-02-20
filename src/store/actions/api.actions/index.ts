import {
  AxiosError,
  AxiosResponse,
  Method,
} from 'axios';

export const API_ERROR = 'API_ERROR';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';

type Body = null;

export const apiError = (
  error: AxiosError,
  entity: store.Entity,
) => ({
  type: `${entity} ${API_ERROR}`,
  payload: {
    data: error,
    meta: {
      entity,
    },
  },
});

export const apiRequest = (
  body: Body,
  method: Method,
  url: string,
  entity: store.Entity,
) => ({
  type: `${entity} ${API_REQUEST}`,
  payload: {
    data: body,
    meta: {
      method,
      url,
      entity,
    },
  },
});

export const apiSuccess = (
  response: AxiosResponse,
  entity: store.Entity,
) => ({
  type: `${entity} ${API_SUCCESS}`,
  payload: {
    data: response,
    meta: {
      entity,
    },
  },
});
