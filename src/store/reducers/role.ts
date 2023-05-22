import { createAction, createReducer } from '@reduxjs/toolkit';
import createAppAsyncThunk from '../../utils/redux';
import axiosInstance from '../../utils/axios';
import { RoleId } from '../../@types/user';
import { newRole } from '../../components/Admin/ModalAddRole';

interface RoleState {
  lists: RoleId[],
  errorAPIRole: string | null,
  successUpdate: string,
  successDelete: string,
  successAdd: string,
}
// Je créer mon interface pour le state de mon reducer
export const initialState: RoleState = {
  lists: [],
  errorAPIRole: null,
  successUpdate: '',
  successDelete: '',
  successAdd: '',
};

export const getAllRole = createAppAsyncThunk(
  'role/GET_ALL_ROLES',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/role');
      return data as RoleId[];
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setRoleErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
      }
      throw err;
    }
  },
);

export const addRole = createAppAsyncThunk(
  'role/ADD_ROLE',
  async (role: newRole , thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/role', role);
      console.log(data);
      return data ;
      
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setRoleErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
      }
      throw err;
    }
  },
);

// Requete API pour modifier une techno
export const updateRole = createAppAsyncThunk(
  'role/PUT_ROLE',
  async (role: RoleId, thunkAPI) => {  
      try {
        const { data } = await axiosInstance.put(`/role/${role.id as number}`, {
          label: role.label,
          color: role.color,
        }
        );
        return data;
        
      } catch (err: any) {
        if (err) {
          thunkAPI.dispatch(setRoleErrorMessage(err.response.data));
        } else {
          console.error(err);
          thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
        }
        throw err;
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
          thunkAPI.dispatch(setRoleErrorMessage(err.response.data));
        } else {
          console.error(err);
          thunkAPI.dispatch(setRoleErrorMessage('Une erreur s\'est produite'));
        }
        throw err;
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
// Je créer mon reducer
const roleReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(setRoleErrorMessage, (state, action) => {
    state.errorAPIRole = action.payload;
  })
  .addCase(deleteMessage, (state) => {
    state.successDelete = '';
  })
  .addCase(deleteMessageUpdate, (state) => {
    state.successUpdate = '';
  })
  .addCase(deleteMessageAdd, (state) => {
    state.successAdd = '';
  })
  .addCase(getAllRole.fulfilled, (state, action) => {
    state.lists = action.payload;
    state.errorAPIRole = null;
  })
  .addCase(getAllRole.rejected, (state, action) => {
    state.errorAPIRole = null
  })
  .addCase(updateRole.rejected, (state) => {
    state.errorAPIRole = null;
  })
  .addCase(updateRole.fulfilled, (state, action) => {
    state.successUpdate = action.payload.message;
    state.errorAPIRole = null;
  })
  .addCase(deleteRole.rejected, (state) => {
    state.errorAPIRole= null;
  })
  .addCase(deleteRole.fulfilled, (state, action) => {
    state.successDelete = action.payload.message;
  })
  .addCase(addRole.rejected, (state) => {
    state.errorAPIRole= null;
  })
  .addCase(addRole.fulfilled, (state, action) => {
    state.successAdd = action.payload.message;
  })
});

export default roleReducer;
