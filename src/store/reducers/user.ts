import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { User } from '../../@types/user';
import { getUserDataFromLocalStorage, removeUserDataFromLocalStorage } from '../../utils/login';
import fakeAvatar from '../../assets/fakeAvatar.png';
import { logout } from './login';

// Je récupère les données de l'utilisateur dans le localStorage
const userData = getUserDataFromLocalStorage();

interface UserUpdate {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  ability: number[]
}

interface UserRegister {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

interface UserState {
  data: User,
  errorAPIUser: string | null,
  allUsers: User[]
  successDelete: string
  successCreate: boolean
  errorRegister: string | null
}
// Je créer mon interface pour le state de mon reducer
export const initialState: UserState = {
  data: {
    id: 1,
    email: '',
    first_name: '',
    last_name: '',
    username: 'unknown',
    github: {
      id: 1,
      login: '',
      avatar_url: '',
    },
    role: {
      id: 1,
      label: '',
    },
    ability: [],
    created_at: '',
    fakeAvatar: fakeAvatar,
  },
  errorAPIUser: null,
  allUsers: [],
  successDelete: '',
  successCreate: false,
  errorRegister: null,
};

// Action creator qui me permet de créer un utilisateur
export const createUser = createAppAsyncThunk(
  'user/CREATE_USER',
  async (user : UserRegister, thunkAPI) => {
    try {
      console.log(user);
      const { data } = await axiosInstance.post('/user/register', user);
      return data as User;
    } catch (err: any) {
      if (err) {
        console.log(err.response.data);
        thunkAPI.dispatch(setUserErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Une erreur s\'est produite.'));
      }
    }
  },
);


// Action creator qui me récupère tous les utilisateurs
export const getAllUsers = createAppAsyncThunk(
  'user/GET_ALL_USERS',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/user');
      return data as User[];
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setUserErrorMessage(err.response.data.message));
      } else {
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Les données de l\'utilisateur n\'ont pas pu être récupérées.'));
      }
    }
  },
);

// Action creator qui me récupère les données de l'utilisateur
export const getUserById = createAppAsyncThunk(
  'user/GET_USER_BY_ID',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/user/${userData!.id}`);
      return data as User;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setUserErrorRegister(err.response.data.message));
      } else {
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Les données de l\'utilisateur n\'ont pas pu être récupérées.'));
      }
    }
  },
);

// Action creator qui me permet de mettre à jour les données de l'utilisateur
export const updateUser = createAppAsyncThunk(
  'user/UPDATE_USER',
  async (user: UserUpdate, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/user/${user.id}`, user);
      return data as User;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setUserErrorMessage(err.response.data.message));
      } else {
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
      throw err;
    }
  },
);

// Action creator qui me permet de supprimer un utilisateur
export const deleteUser = createAppAsyncThunk(
  'user/DELETE_USER',
  async (id: number, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/user/${id}`);
      console.log(data);
      thunkAPI.dispatch(logout());
      return data.message as string;
    } catch (err: any) {
      if (err) {       
        thunkAPI.dispatch(setUserErrorMessage(err.response.data));
      } else { 
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Une erreur s\'est produite.'));
      }
    }
  },
);

// On vide le successCreate après la création d'un utilisateur
export const resetSuccessCreate = createAction('user/RESET_SUCCESS_CREATE');
// On vide le message d'erreur après le register échec
export const resetErrorMessage = createAction('user/RESET_ERROR_MESSAGE');
// On créer une action pour l'update de l'utilisateur lors de la connexion
export const setUser = createAction<User>('user/SET_USER');
// On vide le successDelete après la suppression d'un utilisateur
export const resetSuccessDelete = createAction('user/RESET_SUCCESS_DELETE');
// Gestions des messages d'erreur
export const setUserErrorRegister = createAction<string>('user/SET_USER_ERROR_REGISTER');
export const setUserErrorMessage = createAction<string>('user/SET_USER_ERROR_MESSAGE');
// Je créer mon reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(resetErrorMessage, (state) => {
    state.errorAPIUser = null;
    state.errorRegister = null;
  })
  .addCase(resetSuccessCreate, (state) => {
    state.successCreate = false;
  })
  // On récupère les données de l'utilisateur
    .addCase(setUser, (state, action) => {
      state.data = action.payload;
    })
    .addCase(resetSuccessDelete, (state) => { 
      state.successDelete = '';
    })
    // On récupère le message d'erreur
    .addCase(setUserErrorMessage, (state, action) => {
      state.errorAPIUser = action.payload;
    })
    .addCase(setUserErrorRegister, (state, action) => {
      state.errorRegister = action.payload;
    })
    // On gère le succès de la requête qui récupère tous les utilisateurs
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload!;
      state.errorAPIUser = null;
    })
    // On gère la réussite de la requête qui me permet de récupérer un utilisateur par son id
    .addCase(getUserById.fulfilled, (state, action) => {
      state.data = action.payload!;
      state.errorAPIUser = null;
    })
    .addCase(deleteUser.fulfilled, (state,  action) => {
      state.successDelete = action.payload!;
    })
    .addCase(createUser.rejected, (state) => {  
      state.errorRegister = null;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      if(action.payload === undefined) return;
      state.successCreate = true;
      state.errorRegister = null;
    })
});

export default userReducer;