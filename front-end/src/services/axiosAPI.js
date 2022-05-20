import axios from 'axios';

const hostName = process.env.REACT_APP_HOSTNAME || 'localhost';
const backPort = process.env.REACT_APP_BACKEND_PORT || 3001;
const localURL = `http://${hostName}:${backPort}`;

const mongoURL = process.env.REACT_APP_HEROKU_URL;

const api = axios.create({ baseURL: mongoURL || localURL });

export const apiGet = async (url) => api.get(url);

export const apiPost = async (url, data) => api.post(url, data);

export const apiDelete = async (url) => api.delete(url);

export default api;
