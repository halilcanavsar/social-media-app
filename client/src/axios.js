import axios from 'axios';

export const makeRequest = axios.create({
  //backend server url
  baseURL: 'http://localhost:8800/',
  //to send cookies
  withCredentials: true,
});
