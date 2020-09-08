import {AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_ERROR} from 'react-admin';
import axios from 'axios';
import {host} from './config';

export default (type, params) => {
  console.log(type);
  if (type === AUTH_LOGIN) {
    const {login, password} = params;
    const request = axios.post(`${host}/api/login`, {login, password});
    return request
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.data;
      })
      .then(({token, permission}) => {
        localStorage.setItem('token', token);
        localStorage.setItem('permission', permission);
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('permission');
    return role ? Promise.resolve(role) : Promise.reject();
  }
  if(type === AUTH_ERROR) {
    // return Promise.reject();
  }
  return Promise.resolve();
}
