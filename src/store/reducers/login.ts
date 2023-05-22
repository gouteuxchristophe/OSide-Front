import { createAction, createReducer } from '@reduxjs/toolkit';
import {   getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/login';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { getUserById } from './user';
import { setUser } from './user';

// Je récupère les données de l'utilisateur dans le localStorage
const userStorage = getUserDataFromLocalStorage();
// Je créer mon interface pour le state de mon reducer
interface LoginState {
  logged: boolean;
  code_GitHub: string,
  credentials: {
    email: string;
    password: string;
    passwordConfirm: string;
  };
  token: string;
  errorAPILogin: string | null;
}
// Je créer un type qui me permet de récupérer les clés de mon interface
export type KeysOfCredentials = keyof LoginState['credentials'];
// Je créer mon state initial
export const initialState: LoginState = {
  logged: false,
  code_GitHub: '',
  token: '',
  credentials: {
    email: '',
    password: '',
    passwordConfirm: '',
  },
  errorAPILogin: null ,
  ...userStorage,
};

// Action qui me permet de mettre à jour le code github
export const updateCode = createAction<string>('loginOAuth/UPDATE_CODE');

// Action creator qui me permet de me connecter via GitHub
export const loginOAuth = createAppAsyncThunk(
  'loginOAuth/LOGIN_OAUTH',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const code = state.login.code_GitHub;
    const { data } = await axiosInstance.post(`/user/login/?code=${code}`);
    // Je créer un objet avec les données de l'utilisateur
    const userData = {
      token: data.token,
      logged: true,
    }

    // Je stocke les données de l'utilisateur dans le localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  },
);

// Action creator qui me permet de changer la valeur d'un champ de mon formulaire
export const changeCredentialsField = createAction<{
  value: string;
  propertyKey: KeysOfCredentials
}>('login/changeCredentials');
// Action creator qui me permet de me connecter via le formulaire
export const login = createAppAsyncThunk(
  'user/LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { email, password } = state.login.credentials;
    try {
      const { data: userLogin } = await axiosInstance.post('/user/login', {
        email,
        password,
      });
      // Je stocke les données de l'utilisateur dans le localStorage
      const userDataLogin = {
        token: userLogin.sessionToken,
        id: userLogin.id,
        logged: true,
      }
      // Je stocke les données de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(userDataLogin));
      // Je récupère les données de l'utilisateur
      const user = await axiosInstance.get(`/user/${userLogin.id}`);
      // Je modifie le state de mon reducer user
      thunkAPI.dispatch(setUser(user.data));
      return userLogin as LoginState;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setLoginErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setLoginErrorMessage('Une erreur s\'est produite.'));
      }
      throw err;
    }
  },
);
// Gestions des messages d'erreur
export const setLoginErrorMessage = createAction<string>('login/SET_LOGIN_ERROR_MESSAGE');
// Action creator qui me permet de me déconnecter
export const logout = createAction('user/LOGOUT');
// Je créer mon reducer
const loginReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setLoginErrorMessage, (state, action) => {
    state.errorAPILogin = action.payload;
  })
    // Je met à jour la valeur d'un champ de mon formulaire
    .addCase(changeCredentialsField, (state, action) => {
      const { propertyKey, value } = action.payload;
      state.credentials[propertyKey] = value;
    })
    .addCase(login.rejected, (state) => {
      state.errorAPILogin = null;
    })
    // Dans le cas où ma requête est en réussie
    .addCase(login.fulfilled, (state, action) => {
      // Je met à jour le state logged et token
      state.logged = true;
      state.token = action.payload.token;
      state.errorAPILogin = null
      // Je vide les champs de mon formulaire
      state.credentials.email = '';
    })
    // Je gère la déconnexion
    .addCase(logout, (state) => {
      state.logged = false;
      state.token = '';
      // Je supprime les données du localStorage
      removeUserDataFromLocalStorage();
    })
    // Je gère la mise à jour du code github
    .addCase(updateCode, (state, action) => {
      state.code_GitHub = action.payload;
    })
    // Dans le cas où ma requête GitHub est réussie
    .addCase(loginOAuth.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.logged = true
    })
});

export default loginReducer;
