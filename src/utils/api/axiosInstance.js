import axios from 'axios';
export const BASE_URL = 'http://localhost:8000/api/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer '
  }
});

export const axiosFormInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer '
  }
});