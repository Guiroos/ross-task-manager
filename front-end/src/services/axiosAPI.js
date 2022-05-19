import axios from 'axios';

const PORT = 3001;
const hostName = process.env.REACT_APP_HOSTNAME || 'localhost';
const backPort = process.env.REACT_APP_BACKEND_PORT || PORT;

const appURL = `http://${hostName}:${backPort}`;

const api = axios.create({ baseURL: appURL });

export const apiGet = async (url) => api.get(url);

export const apiPost = async (url, data) => api.post(url, data);

export const apiDelete = async (url) => api.delete(url);

export default api;
