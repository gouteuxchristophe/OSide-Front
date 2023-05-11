import { createReducer } from '@reduxjs/toolkit';
import { IUser } from '../../@types/user';

interface LoginProps {
  logged: boolean,
  credentials: {
    email: string,
    password: string,
  },
  isLoading: boolean,
  pseudo: string,
  token: string,
  errorLogin: string | null;
  user: IUser
}

const initialState: LoginProps = {
  logged: true,
  credentials: {
    email: 'bouclierman@herocorp.io',
    password: 'jennifer',
  },
  isLoading: false,
  pseudo: 'Anonymous',
  token: '',
  errorLogin: null,
  user: {
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
  },
};

const loginReducer = createReducer(initialState, (builder) => {

});

export default loginReducer;
