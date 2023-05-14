import { createAction, createReducer } from '@reduxjs/toolkit';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/login';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';

// Je récupère les données de l'utilisateur dans le localStorage
const userData = getUserDataFromLocalStorage();
// Je créer mon interface pour le state de mon reducer
interface LoginState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  token: string;
  errorLogin: boolean
}
// Je créer un type qui me permet de récupérer les clés de mon interface
export type KeysOfCredentials = keyof LoginState['credentials'];
// Je créer mon state initial
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

// Action creator qui me permet de changer la valeur d'un champ de mon formulaire
export const changeCredentialsField = createAction<{
  value: string;
  propertyKey: KeysOfCredentials
}>('login/changeCredentials');
// Action creator qui me permet de me connecter
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
// Action creator qui me permet de me déconnecter
export const logout = createAction('user/LOGOUT');
// Je créer mon reducer
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
