import axios, { AxiosInstance } from 'axios';
require('dotenv').config();

const _baseURL = 'https://api.themoviedb.org/3/';

const token = process.env.API_KEY || '';

const httpClient: AxiosInstance = axios.create({
  baseURL: _baseURL,
});

httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default httpClient;
