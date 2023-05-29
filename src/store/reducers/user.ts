import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { User, IAbility } from '../../@types/user';
import { getUserDataFromLocalStorage } from '../../utils/login';
import { logout } from './login';

// Je récupère les données de l'utilisateur dans le localStorage
const userData = getUserDataFromLocalStorage();

interface UserUpdate {
  id: number,
  first_name?: string,
  last_name?: string,
  email?: string,
  password?: string,
  passwordConfirm?: string,
  ability?: number[]
  roleId?: number
  bio?: string
  github_id?: number | null
}

interface UserRegister {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

interface Member {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  avatar_url: string,
  github: {
    login: string,
  },
  role: {
    label: string,
    color: string,
  },
  bio: string,
  ability: IAbility[]
}


interface UserState {
  data: User,
  errorAPIUser: string | null,
  allUsers: User[]
  successDelete: string
  successCreate: boolean
  errorRegister: string | null
  successUpdate: string
  errorUpdate: string
  member: Member
  temporalyUserUpdate: UserUpdate
}

// Je créer mon interface pour le state de mon reducer
export const initialState: UserState = {
  data: {
    id: 1,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    avatar_url: '',
    github: {
      id: 1,
      login: '',
    },
    role: {
      id: 1,
      label: '',
    },
    ability: [],
    created_at: '',
    bio: '',
  },
  errorAPIUser: null,
  allUsers: [],
  successDelete: '',
  successCreate: false,
  errorRegister: null,
  successUpdate: '',
  errorUpdate: '',
  member: {
    id: 1,
    first_name: '',
    last_name: '',
    username: '',
    avatar_url: '',
    github: {
      login: '',
    },
    role: {
      label: '',
      color: '',
    },
    bio: '',
    ability: [],
  },
  temporalyUserUpdate: {
    id: 1,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    ability: [],
    bio: '',
  }
};

// Action creator qui me permet de créer un utilisateur
export const createUser = createAppAsyncThunk(
  'user/CREATE_USER',
  async (user: UserRegister, thunkAPI) => {
    try {
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

// Action creator qui récupère les infos d'un membre
export const getMemberById = createAppAsyncThunk(
  'user/GET_MEMBER_BY_ID',
  async (id: number, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/user/${id}`);
      return data as Member;
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
      return data.message;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setUserErrorUpdate(err.response.data));
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

// Action creator qui me permet de supprimer un utilisateur
export const deleteUserByAdmin = createAppAsyncThunk(
  'user/DELETE_USER',
  async (id: number, thunkAPI) => {
    console.log(id);
    try {
      const { data } = await axiosInstance.delete(`/user/${id}`);
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

// On stocke temporairement les données d'update de l'utilisateur
export const setTemporalyUserUpdate = createAction<UserUpdate>('user/SET_TEMPORALY_USER_UPDATE');
// On vide les données d'update de l'utilisateur
export const resetTemporalyUserUpdate = createAction('user/RESET_TEMPORALY_USER_UPDATE');
// On créer une action pour l'update de l'utilisateur lors de la connexion
export const setUser = createAction<User>('user/SET_USER');
// On vide les messages de succès ou d'erreur
// On vide le successCreate après la création d'un utilisateur
export const resetSuccessCreate = createAction('user/RESET_SUCCESS_CREATE');
// On vide le message d'erreur après le register
export const resetErrorMessage = createAction('user/RESET_ERROR_MESSAGE');
// On vide le successDelete après la suppression d'un utilisateur
export const resetSuccessDelete = createAction('user/RESET_SUCCESS_DELETE');
// On vide le successUpdate après la mise à jour d'un utilisateur
export const resetSuccessUpdate = createAction('user/RESET_SUCCESS_UPDATE');
// On vide le usertErrorRegister après la mise à jour d'un utilisateur
export const deleteUserErrorRegister = createAction<string>('user/DELETE_USER_ERROR');
// On vide le userErrorUpdate après la mise à jour d'un utilisateur
export const resetUserErrorUpdate = createAction<string>('user/RESET_USER_ERROR_UPDATE');
// Création des messages d'erreur
export const setUserErrorUpdate = createAction<string>('user/SET_USER_ERROR_UPDATE');
export const setUserErrorRegister = createAction<string>('user/SET_USER_ERROR_REGISTER');
export const setUserErrorMessage = createAction<string>('user/SET_USER_ERROR_MESSAGE');
// on vide le data lors du logout
export const resetData = createAction('user/RESET_DATA');
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
    // On récupère le message d'erreur
    .addCase(setUserErrorUpdate, (state, action) => {
      state.errorUpdate = action.payload;
    })
    // On reset le message de succès de mise à jour
    .addCase(resetSuccessUpdate, (state) => {
      state.successUpdate = '';
    })
    // On supprime le message d'erreur d'inscription
    .addCase(deleteUserErrorRegister, (state, action) => {
      state.errorRegister = action.payload;
    })
    // On supprime le message de succès de suppression du compte
    .addCase(resetSuccessDelete, (state) => {
      state.successDelete = '';
    })
    // On récupère le message d'erreur
    .addCase(setUserErrorMessage, (state, action) => {
      state.errorAPIUser = action.payload;
    })
    // On supprime le message d'erreur de mise à jour
    .addCase(setUserErrorRegister, (state, action) => {
      state.errorRegister = action.payload;
    })
    // On supprime le message d'erreur de mise à jour
    .addCase(resetUserErrorUpdate, (state) => {
      state.errorUpdate = ''
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
    .addCase(getMemberById.fulfilled, (state, action) => {
      state.member = action.payload!;
      state.errorAPIUser = null;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.successDelete = action.payload!;
    })
    .addCase(createUser.rejected, (state) => {
      state.errorRegister = null;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      if (action.payload === undefined) return;
      state.successCreate = true;
      state.errorRegister = null;
    })
    .addCase(resetData, (state) => {
      state.data = initialState.data;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload === undefined) return;
      state.successUpdate = action.payload!;
    })
    .addCase(setTemporalyUserUpdate, (state, action) => {
      state.temporalyUserUpdate = action.payload;
    })
    .addCase(resetTemporalyUserUpdate, (state) => {
      state.temporalyUserUpdate = initialState.temporalyUserUpdate;
    })
});

export default userReducer;