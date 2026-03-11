import axios from 'axios';
import { baseURL, HTTP } from '../common/Constant';

const apiCall = axios.create({
  baseURL: baseURL,
  headers: HTTP.AuthHeader,
});

apiCall.interceptors.response.use(
  res => res,
  err => {
    //common api fails handling
    return Promise.reject(err);
  },
);

export default apiCall;
