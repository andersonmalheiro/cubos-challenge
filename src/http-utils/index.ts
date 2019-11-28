import axios, { AxiosInstance } from 'axios';
require('dotenv').config();

const _baseURL = 'https://api.themoviedb.org/3/';

const token = '94a700b37cd881aa3d9da9fb8c46acdf';

const httpClient: AxiosInstance = axios.create({
  baseURL: _baseURL,
});

// httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default httpClient;
