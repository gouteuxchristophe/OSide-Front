import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { User } from '../../@types/user';
import { getUserDataFromLocalStorage } from '../../utils/login';
import { LoginResponse } from '../../@types/login';

export const initialState: User = {
  id: 1,
  email: '',
  first_name: '',
  last_name: '',
  github_login: '',
  role_id: {
    id: 1,
    label: '',
  },
  avatar: '',
  owner: [],
};

const userData = getUserDataFromLocalStorage() as LoginResponse;

export const getUserById = createAppAsyncThunk(
  'user/GET_USER_BY_ID',
  async () => {
    const { data } = await axiosInstance.get(`/${userData.id as number}`);
    return data as User;
  },
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUserById.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.github_login = action.payload.github_login;
      state.role_id = action.payload.role_id;
      state.avatar = action.payload.avatar;
      state.owner = action.payload.owner;
    });
});

export default userReducer;
