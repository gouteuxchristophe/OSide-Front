import { LoginResponse } from '../@types/login';

export const getUserDataFromLocalStorage = () => {
  const userDataStr = localStorage.getItem('user');
  const userData = userDataStr ? (JSON.parse(userDataStr)) as LoginResponse : null;
  return userData;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem('user');
};
