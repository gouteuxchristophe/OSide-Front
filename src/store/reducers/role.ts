import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { Role } from '../../@types/user';
import { newRole } from '../../components/Admin/ModalAddRole';

interface RoleState {
  lists: Role[],
  errorAPIRole: string
  successUpdate: string,
  successDelete: string,
  successAdd: string,
}
// Je créer mon interface pour le state de mon reducer
export const initialState: RoleState = {
  lists: [],
  errorAPIRole: '',
  successUpdate: '',
  successDelete: '',
  successAdd: '',
};

export const getAllRole = createAppAsyncThunk(
  'role/GET_ALL_ROLES',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/role');
      return data as Role[];
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setRoleErrorMessage(err.response.data.message));
      } else {
        console.error(err);
        thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
      }
    }
  },
);

export const addRole = createAppAsyncThunk(
  'role/ADD_ROLE',
  async (role: newRole , thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/role', role);
      return data ;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setRoleErrorMessage(err.response.data.message));
      } else {
        console.error(err);
        thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
      }
    }
  },
);

// Requete API pour modifier une techno
export const updateRole = createAppAsyncThunk(
  'role/PUT_ROLE',
  async (role: Role, thunkAPI) => {  
      try {
        const { data } = await axiosInstance.put(`/role/${role.id as number}`, {
          label: role.label,
          color: role.color,
        }
        );
        return data;
      } catch (err: any) {
        if (err) {
          thunkAPI.dispatch(setRoleErrorMessage(err.response.data.message));
        } else {
          console.error(err);
          thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
        }
      }
  },
);

// Requete API pour supprimer une techno
export const deleteRole = createAppAsyncThunk(
  'role/DELETE_ROLE',
  async (idRole: number, thunkAPI) => {
      try {
        const { data } = await axiosInstance.delete(`/role/${idRole}`, idRole as any);
        return data;
      } catch (err: any) {
        if (err) {
          thunkAPI.dispatch(setRoleErrorMessage(err.response.data.message));
        } else {
          console.error(err);
          thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
        }
      }
  },
);

// Action creator qui me permet de supprimer le message de succès de la suppression d'une techno
export const deleteMessage = createAction('role/DELETE_MESSAGE');
// Action creator qui me permet de supprimer le message de succès de la modification d'une techno
export const deleteMessageUpdate = createAction('role/DELETE_SUCCESS_UPDATE');
// Action creator qui me permet de supprimer le message de succès de la modification d'une techno
export const deleteMessageAdd = createAction('role/DELETE_SUCCESS_ADD');
// Gestions des messages d'erreur
export const setRoleErrorMessage = createAction<string>('role/SET_ROLE_ERROR_MESSAGE');
export const deleteRoleErrorMessage = createAction('role/DELETE_ROLE_ERROR_MESSAGE');
// Je créer mon reducer
const roleReducer = createReducer(initialState, (builder) => {
  builder
  // On gère le message d'erreur
  .addCase(setRoleErrorMessage, (state, action) => {
    state.errorAPIRole = action.payload;
  })
  .addCase(deleteRoleErrorMessage, (state) => {
    state.errorAPIRole = '';
  })
  // On vide le message de succès de la suppression d'une techno
  .addCase(deleteMessage, (state) => {
    state.successDelete = '';
  })
  // On vide le message de succès de la modification d'une techno
  .addCase(deleteMessageUpdate, (state) => {
    state.successUpdate = '';
  })
  // On vide le message de succès de l'ajout d'une techno
  .addCase(deleteMessageAdd, (state) => {
    state.successAdd = '';
  })
  // On gère le succès de la requête qui récupère tous les rôles
  .addCase(getAllRole.fulfilled, (state, action) => {
    state.lists = action.payload!;
    state.errorAPIRole = '';
  })
  // On gère la réussite de la requête qui me permet de modifier un rôle
  .addCase(updateRole.fulfilled, (state, action) => {
    if (state.lists !== null) return
    state.successUpdate = action.payload.message;
    state.errorAPIRole = '';
  })
  // On gère la réussite de la requête qui me permet de supprimer un rôle
  .addCase(deleteRole.fulfilled, (state, action) => {
    state.successDelete = action.payload.message;
    state.errorAPIRole = '';
  })
  // On gère la réussite de la requête qui me permet d'ajouter un rôle
  .addCase(addRole.fulfilled, (state, action) => {
    if (state.lists !== null) return
    state.successAdd = action.payload.message;
    state.errorAPIRole = '';
  })
});

export default roleReducer;