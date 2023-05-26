import { PayloadAction, createAction, createReducer, isAnyOf } from '@reduxjs/toolkit';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/login';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { setUser } from './user';

// Je récupère les données de l'utilisateur dans le localStorage
const userStorage = getUserDataFromLocalStorage();
// Je créer mon interface pour le state de mon reducer
interface LoginState {
  logged: boolean;
  code_GitHub: string,
  role: number;
  credentials: {
    email: string;
    password: string;
    passwordConfirm: string;
  };
  token: string;
  errorLoginMessage: string;
  message: string;
}
// Je créer un type qui me permet de récupérer les clés de mon interface
export type KeysOfCredentials = keyof LoginState['credentials'];
// Je créer mon state initial
export const initialState: LoginState = {
  logged: false,
  code_GitHub: '',
  role: 0,
  token: '',
  credentials: {
    email: '',
    password: '',
    passwordConfirm: '',
  },
  errorLoginMessage: '',
  message: '',
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
    try {
      const { data : userLogin } = await axiosInstance.post(`/user/login/?code=${code}`);
      const userDataLogin = {
        id: userLogin.id,
        token: userLogin.sessionToken,
        logged: true,
      }
      // Je stocke les données de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(userDataLogin));
      // Je récupère les données de l'utilisateur
      const user = await axiosInstance.get(`/user/${userDataLogin.id}`);
      // Je reparse les données de l'utilisateur pour ajouter le role
      const userData = getUserDataFromLocalStorage();
      // Je créer un objet qui contient les données de l'utilisateur et le role
      const userWithRole = {
        ...userData,
        role: user.data.role.id,
      }
      // Je stocke les données de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(userWithRole));
      thunkAPI.dispatch(setUser(user.data));
      return userLogin as LoginState;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setLoginErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setLoginErrorMessage('Une erreur s\'est produite.'));
      }
    }
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
    // On récupère l'email et le mot de passe du state credentials
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
      // Je reparse les données de l'utilisateur pour ajouter le role
      const userData = getUserDataFromLocalStorage();
      // Je créer un objet qui contient les données de l'utilisateur et le role
      const userWithRole = {
        ...userData,
        role: user.data.role.id,
      }
      // Je stocke les données de l'utilisateur dans le localStorage
      localStorage.setItem('user', JSON.stringify(userWithRole));
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
      state.errorLoginMessage = action.payload;
    })
    // Je met à jour la valeur d'un champ de mon formulaire
    .addCase(changeCredentialsField, (state, action) => {
      const { propertyKey, value } = action.payload;
      state.credentials[propertyKey] = value;
    })
    // On gère la réussite de la requête qui me permet de me connecter
    // Je gère la déconnexion
    .addCase(logout, (state) => {
      state.message = '';
      state.errorLoginMessage = '';
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
    .addMatcher(isAnyOf(login.fulfilled, loginOAuth.fulfilled), (state, action) => {
      // Je met à jour le state logged et token
      state.message = action.payload!.message;
      state.logged = true;
      state.token = action.payload!.token;
      state.errorLoginMessage = ''
      // Je vide les champs de mon formulaire
      state.credentials.email = '';
    })
});

export default loginReducer;
