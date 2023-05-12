import axios from 'axios';
import { getUserDataFromLocalStorage } from './login';

// Je créer une instance d'axios me permettant d'enregistrer
// une configuration de base
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

axiosInstance.interceptors.request.use((config) => {
  const userData = getUserDataFromLocalStorage();
  // Do something before request is sent
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = userData ? `Bearer ${userData.token}` : null;
  return config;
}, (error) => {
  Promise.reject(error);
});

export default axiosInstance;
