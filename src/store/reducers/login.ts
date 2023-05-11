import { createAction, createReducer } from '@reduxjs/toolkit';
import { getUserDataFromLocalStorage } from '../../utils/login';

const userData = getUserDataFromLocalStorage();

interface LoginState {
  logged: boolean;
  credentials: {
    email: string;
    password: string;
  };
  pseudo: string;
  token: string;
}

export const initialState: LoginState = {
  logged: false,
  pseudo: '',
  token: '',
  credentials: {
    email: '',
    password: '',
  },
};

export const changeCredentialsField = createAction<{ value: string; field: keyof LoginState['credentials'] }>('login/changeCredentials');

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsField, (state, action) => {
      const { field, value } = action.payload;
      state.credentials[field] = value;
    });
});

export default loginReducer;
