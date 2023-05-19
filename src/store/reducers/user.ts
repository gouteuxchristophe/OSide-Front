import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { User } from '../../@types/user';
import { getUserDataFromLocalStorage } from '../../utils/login';
import { LoginResponse } from '../../@types/login';
import fakeAvatar from '../../assets/fakeAvatar.png';


interface UserUpdate {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  ability: number[]
}

interface UserState {
  data: User,
  errorAPIUser: string | null,
  dataReception: boolean
  allUsers: User[]
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
  dataReception: false,
  allUsers: [],
};
// Je récupère les données de l'utilisateur dans le localStorage
const userData = getUserDataFromLocalStorage() as LoginResponse;

export const getAllUsers = createAppAsyncThunk(
  'user/GET_ALL_USERS',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/user');
      return data as User[];
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setUserErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Les données de l\'utilisateur n\'ont pas pu être récupérées.'));
      }
      throw err;
    }
  },
);

// Action creator qui me récupère les données de l'utilisateur
export const getUserById = createAppAsyncThunk(
  'user/GET_USER_BY_ID',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/user/${userData.id}`);
      console.log(data);
      return data as User;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setUserErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Les données de l\'utilisateur n\'ont pas pu être récupérées.'));
      }
      throw err;
    }
  },
);

// On créer une action pour l'update de l'utilisateur
export const updateUser = createAppAsyncThunk(
  'user/UPDATE_USER',
  async (user: UserUpdate, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/user/${user.id}`, user);
      return data as User;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setUserErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setUserErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
      throw err;
    }
  },
);
// Gestions des messages d'erreur
export const setUserErrorMessage = createAction<string>('user/SET_USER_ERROR_MESSAGE');
// Je créer mon reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserErrorMessage, (state, action) => {
      state.errorAPIUser = action.payload;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.errorAPIUser = null;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
      state.errorAPIUser = null;
    })
    .addCase(getUserById.rejected, (state, action) => {
      state.errorAPIUser = null;
    })
    .addCase(getUserById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.errorAPIUser = null;
      state.dataReception = true;
    });
});

export default userReducer;
