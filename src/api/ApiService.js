import { baseURL, HTTP } from '../common/Constant';
import apiCall from './ApiCall';

export const login = req =>
  apiCall({
    method: 'post',
    url: baseURL + 'homeCollectionAppLogin',
    headers: HTTP.NoAuthHeader,
    data: JSON.stringify(req),
  });
