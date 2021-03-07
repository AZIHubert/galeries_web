import axios, {
  Method,
} from 'axios';

export default (
  body: any,
  method: Method,
  url: string,
  token?: string | null,
  confirmToken?: string,
  contentType?: string,
  page?: number,
  params?: string,
) => axios.request({
  data: body,
  method,
  baseURL: 'http://localhost:5000',
  url: `${url}${params || ''}${page ? `?page=${page}` : ''}`,
  headers: {
    authorization: token,
    'Content-Type': contentType || 'application/json',
    confirmation: confirmToken,
  },
  withCredentials: true,
});
