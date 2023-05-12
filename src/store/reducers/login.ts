import { createAction, createReducer } from '@reduxjs/toolkit';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/login';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';

const userData = getUserDataFromLocalStorage();

interface LoginState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  token: string;
  errorLogin: boolean
}

export type KeysOfCredentials = keyof LoginState['credentials'];

export const initialState: LoginState = {
  logged: false,
  token: '',
  credentials: {
    email: '',
    password: '',
  },
  errorLogin: false,
  ...userData,
};

// Action qui permet de changer la valeur d'un champ du formulaire de connexion
export const changeCredentialsField = createAction<{
  value: string;
  propertyKey: KeysOfCredentials
}>('login/changeCredentials');

export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { email, password } = state.login.credentials;
    const { data: userLogin } = await axiosInstance.post('/login', {
      email,
      password,
    });
    // Je stocke les données de l'utilisateur dans le localStorage
    localStorage.setItem('user', JSON.stringify(userLogin));
    return userLogin as LoginState;
  },
);

export const logout = createAction('user/LOGOUT');

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { propertyKey, value } = action.payload;
      state.credentials[propertyKey] = value;
    })
    // Dans le cas où ma requête est en cours
    .addCase(login.pending, (state) => {
      state.errorLogin = false;
    })
    // Dans le cas où ma requête a échoué
    .addCase(login.rejected, (state) => {
      state.errorLogin = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.logged = action.payload.logged;
      state.token = action.payload.token;
      state.credentials.email = '';
      state.credentials.password = '';
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.token = '';
      // Quand je me déconnecte je supprime les données du localStorage
      removeUserDataFromLocalStorage();
    });
});

export default loginReducer;
