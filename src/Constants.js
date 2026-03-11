import { testingConfig, productionConfig } from '../app.json';

export const isTesting = true;
export const baseURL = isTesting
  ? testingConfig.serverUrl
  : productionConfig.serverUrl;

export const HTTP = {
  NoAuthHeader: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  AuthHeader: {
    'Content-Type': 'application/json',
    Accept: '*/*',
    Authorization: AuthToken,
  },

  FormDataHeader: {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
    Authorization: AuthToken,
  },
};
