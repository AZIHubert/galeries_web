import axios, {
  Method,
} from 'axios';

export default (
  body: any,
  method: Method,
  url: string,
  token?: string | null,
  confirmToken?: string,
) => axios.request({
  data: body,
  method,
  baseURL: 'http://localhost:5000',
  url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
    confirmation: confirmToken,
  },
  withCredentials: true,
});
