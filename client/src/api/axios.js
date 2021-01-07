import Axios from 'axios';

import config from '../config/config';
import setAuthToken from '../utils/setAuthToken';

// Axios.defaults.headers.common.api_key = config.API_KEY;

const URI = config.URI;
const DEFAULT_HEADER = { headers: { 'Content-Type': 'application/json' } };

export function loadUser(data) {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else setAuthToken();
  return Axios.get(`${URI}/api/auth`, {}, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
};

export function userSignIn(data) {
  const url = `${URI}/api/auth/user`;
  return Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function userSignup(data) {
  const url = `${URI}/api/users`;
  return Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function hospitalSignIn(data) {
  const url = `${URI}/api/auth/hospital`;
  setAuthToken(data.idToken);
  return Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function getUserRequests(data) {
  const url = `${URI}/api/request/user`;
  return Axios.get(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function getHospitalRequests(data) {
  const url = `${URI}/api/request/hospital`;
  return Axios.get(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function fetchHospitals(data) {
  const url = `${URI}/api/hospital`;
  return Axios.get(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function fetchUsers(data) {
  const url = `${URI}/api/users`;
  return Axios.get(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function addRequest(data) {
  const url = `${URI}/api/request`;
  return Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}

export function editRequest(data) {
  const url = `${URI}/api/request/edit`;
  return Axios.post(url, data, DEFAULT_HEADER).then((response) => {
    return response.data;
  });
}
