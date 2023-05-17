import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { User } from '../../@types/user';
import { getUserDataFromLocalStorage } from '../../utils/login';
import { LoginResponse } from '../../@types/login';
import { setLoginErrorMessage } from './login';


interface UserUpdate {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  ability: number[]
}
// Je créer mon interface pour le state de mon reducer
export const initialState: User = {
  id: 1,
  email: '',
  first_name: '',
  last_name: '',
  username: '',
  github : {
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
  fakeAvatar: '',
};
// Je récupère les données de l'utilisateur dans le localStorage
const userData = getUserDataFromLocalStorage() as LoginResponse;
// Action creator qui me récupère les données de l'utilisateur
export const getUserById = createAppAsyncThunk(
  'user/GET_USER_BY_ID',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/user/${userData.id}`);
      return data as User;
    } catch (err: any) {
      if (err.response?.data) {
        thunkAPI.dispatch(setLoginErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setLoginErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
      throw err;
    }
  },
);

// On créer une action pour se l'update de l'utilisateur
export const updateUser = createAppAsyncThunk(
  'user/UPDATE_USER',
  async (user: UserUpdate, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/user/${user.id}`, user);
      return data as User;
    } catch (err: any) {
      if (err.response?.data) {
        thunkAPI.dispatch(setLoginErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setLoginErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
      throw err;
    }
  },
);



// Je créer mon reducer
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUserById.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.github = action.payload.github;
      state.role = action.payload.role;
      state.ability = action.payload.ability;
      state.created_at = action.payload.created_at;
      state.fakeAvatar = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
    });
});

export default userReducer;
