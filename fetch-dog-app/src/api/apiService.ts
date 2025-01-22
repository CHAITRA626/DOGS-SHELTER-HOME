import axios from 'axios';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';

axios.defaults.withCredentials = true;

export const login = (name: string, email: string) => {
  return axios.post(`${BASE_URL}/auth/login`, { name, email });
};

export const logout = () => {
  return axios.post(`${BASE_URL}/auth/logout`);
};

export const getBreeds = () => {
  return axios.get(`${BASE_URL}/dogs/breeds`);
};

export const searchDogs = (params: any) => {
  return axios.get(`${BASE_URL}/dogs/search`, { params });
};

export const getDogsByIds = (ids: string[]) => {
  return axios.post(`${BASE_URL}/dogs`, ids);
};

export const matchDogs = (ids: string[]) => {
  return axios.post(`${BASE_URL}/dogs/match`, ids);
};