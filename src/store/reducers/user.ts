import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { User } from '../../@types/user';
import { getUserDataFromLocalStorage } from '../../utils/login';
import { LoginResponse } from '../../@types/login';
import { setLoginErrorMessage } from './login';

// Je créer mon interface pour le state de mon reducer
export const initialState: User = {
  id: 1,
  email: '',
  first_name: '',
  last_name: '',
  username: '',
  github_login: '',
  avatar: '',
  role: {
    id: 1,
    label: '',
  },
  ability: [],
  created_at: '',
};
// Je récupère les données de l'utilisateur dans le localStorage
const userData = getUserDataFromLocalStorage() as LoginResponse;
// Action creator qui me récupère les données de l'utilisateur
export const getUserById = createAppAsyncThunk(
  'user/GET_USER_BY_ID',
  async (_, thunkAPI) => {
    try {
      
    } catch (err: any) {
        if (err.response?.data) {
          thunkAPI.dispatch(setLoginErrorMessage(err.response.data));
        } else {
          console.error(err);
          thunkAPI.dispatch(setLoginErrorMessage('Une erreur s\'est produite lors de la connexion.'));
        }
        throw err;
    }
    const { data } = await axiosInstance.get(`/user/${userData.id}`);
    console.log(data);
    
    return data as User;
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
      state.username = action.payload.username;
      state.github_login = action.payload.github_login;
      state.avatar = action.payload.avatar;
      state.role = action.payload.role;
      state.ability = action.payload.ability;
      state.created_at = action.payload.created_at;
    });
});

export default userReducer;
