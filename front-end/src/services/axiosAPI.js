import axios from 'axios';

const mongoURL = 'https://be-task-manager.herokuapp.com/';

const api = axios.create({ baseURL: mongoURL });

export const apiGet = async (url) => api.get(url);

export const apiPost = async (url, data) => api.post(url, data);

export const apiDelete = async (url) => api.delete(url);

export default api;
