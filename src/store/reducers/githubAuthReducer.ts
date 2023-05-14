import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/login';
import createAppAsyncThunk from '../../utils/redux';
import axios from '../../utils/axios';
import axiosInstance from '../../utils/axios';

// Je récupère les données de l'utilisateur dans le localStorage
const userData = getUserDataFromLocalStorage();

// Je créer mon state initial
export const initialState = {
  token: '',
  code: '',
  errorLogin: false,
  ...userData,
};

export const updateCode = createAction<string>('loginOAuth/UPDATE_CODE');

// Action creator qui me permet de me connecter
export const loginOAuth = createAppAsyncThunk(
  'loginOAuth/LOGIN_OAUTH',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const code = state.gitHubAuth.code;
    console.log(code);
    
    const { data } = await axiosInstance.post('/callback', {
      code
    });
    // Je stocke les données de l'utilisateur dans le localStorage
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },
);
// Action creator qui me permet de me déconnecter
export const logout = createAction('user/LOGOUT');
// Je créer mon reducer
const loginWithGitHubReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(updateCode, (state, action) => {
    state.code = action.payload;
  })
    // Dans le cas où ma requête est en cours
    .addCase(loginOAuth.pending, (state) => {
      state.errorLogin = false;
    })
    // Dans le cas où ma requête a échoué
    .addCase(loginOAuth.rejected, (state) => {
      state.errorLogin = true;
    })
    .addCase(loginOAuth.fulfilled, (state, action) => {

    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.token = '';
      // Quand je me déconnecte je supprime les données du localStorage
      removeUserDataFromLocalStorage();
    });
});

export default loginWithGitHubReducer;
