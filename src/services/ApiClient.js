import axios from 'axios';
import qs from 'qs';
import messages from '../../locales';
import appConfig, { apiConfig } from '../config/config';
import APIError from '../utils/APIError';


axios.interceptors.request.use(config => {
  config.paramsSerializer = params => qs.stringify(params, {
    arrayFormat: "brackets",
    encode: false
  });
  return config;
});

class ApiClient {
  setAuthService(authService) {
    this.authService = authService;
  }

  getHeaders(configHeaders) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (this.authService.isLoggedIn()) {
      headers.Authorization = `Bearer ${this.authService.authState().token}`;
    }

    return {
      ...headers,
      ...configHeaders
    };
  }

  async request(config) {
    try {
      const headers = this.getHeaders(config.headers || {});
      const result = await axios({
        ...config,
        url: `${appConfig.app.apiUrl}${config.url}`,
        headers,
        mode: 'cors'
      });

      return result.data;
    } catch (error) {
      if (error.response && error.response.status === 500) {
        throw new Error(messages.errors.serverError);
      } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        if(config.url.endsWith('revokeToken')) {
          //do nothing
        } else if (this.authService.isLoggedIn()) {
          this.authService.logout();
        }
      }

      throw new APIError(error.response.status, error.response.data.message, error.response.data.error);
    }
  }

  async get(url, config = {}) {
    let response;
    try {
      response = this.request({
        ...config,
        url,
        method: 'get'
      });
    } catch(error) {
      console.error(error);
    }
    return response;
  }

  async post(url, data, config) {
    let response;
    try {
      response = this.request({
        ...config,
        url,
        data,
        method: 'post'
      });
    } catch(error) {
      console.error(error);
    }
    return response
  }

  async delete(url, data, config) {
    let response;
    try {
      response = this.request({
        ...config,
        url,
        data,
        method: 'delete'
      });
    } catch(error) {
      console.error(error);
    }
    return response;
  }

  async put(url, data, config) {
    let response
    try {
      response = this.request({
        ...config,
        url,
        data,
        method: 'put'
      });
    } catch(error) {
      console.error(error);
    }
    return response;
  }

}

export default ApiClient;
