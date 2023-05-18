import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ITechnoProjet } from '../../@types/project';
import axiosInstance from '../../utils/axios';
import { newTechno } from '../../components/Modals/AddTechno';
import createAppAsyncThunk from '../../utils/redux';
import { getTechnosAPI } from './search';

interface technoState {
  technoLists: ITechnoProjet[];
  message: string;
  successDelete: string;
  successUpdate: string;
  selectedTechnos: ITechnoProjet[];
}

// Je créer mon state initial
export const initialState: technoState = {
  technoLists: [],
  message: '',
  successDelete: '',
  successUpdate: '',
  selectedTechnos: [],
};

export const updatedSelectedTechnos = createAction<newTechno[]>('technos/UPDATED_SELECTED_TECHNO');

// Requete API pour récupérer toutes les technos
export const getAllTechnos = createAppAsyncThunk(
  'technos/GET_All_TECHNO',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/techno');
      thunkAPI.dispatch(getTechnosAPI(data));
      return data as ITechnoProjet[];
    } catch (err: any) {
      if (err.response?.data) {
        console.log(err.response.data);
      } else {
        console.error(err);
      }
      throw err;
    }
  },
);

// Requete API pour ajouter une techno
export const addTechno = createAsyncThunk(
  'technos/ADD_TECHNO',
  async (techno: newTechno[]) => {
    try {
      const { data } = await axiosInstance.post(`/techno`, techno);
      return data as technoState;
    } catch (err: any) {
      if (err.response?.data) {
      } else {
        console.error(err);
      }
      throw err;
    }
  },
);

// Requete API pour modifier une techno
export const updateTechno = createAsyncThunk(
  'technos/PUT_TECHNO',
  async (techno: ITechnoProjet) => {
      try {
        const { data } = await axiosInstance.put(`/techno/${techno.id as number}`, {
          label: techno.label,
          color: techno.color,
        }
        );
        return data;
      } catch (err: any) {
        if (err) {
          console.log(err.response.data);
        } else {
          console.error(err);
        }
        throw err;
      }
  },
);


// Requete API pour supprimer une techno
export const deleteTechno = createAsyncThunk(
  'technos/DELETE_TECHNO',
  async (idTechno: number) => {
      try {
        const { data } = await axiosInstance.delete(`/techno/${idTechno}`, idTechno as any);
        return data;
      } catch (err: any) {
        if (err) {
          console.log(err.response.data);
        } else {
          console.error(err);
        }
        throw err;
      }
  },
);

// Action creator qui me permet de supprimer le message de succès de la suppression d'une techno
export const deleteMessage = createAction('technos/DELETE_MESSAGE');
// Action creator qui me permet de supprimer le message de succès de la modification d'une techno
export const deleteMessageUpdate = createAction('technos/DELETE_SUCCESS');

// Je créer mon reducer
const technoReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(getAllTechnos.fulfilled, (state, action) => {
    state.technoLists = action.payload;
  })
  .addCase(addTechno.fulfilled, (state, action) => {
    state.message = action.payload.message;
  })
  .addCase(updatedSelectedTechnos, (state, action) => {
    state.selectedTechnos = action.payload;
  })
  .addCase(deleteTechno.fulfilled, (state, action) => {
    state.successDelete = action.payload.message;
  })
  .addCase(updateTechno.fulfilled, (state, action) => {
    state.successUpdate = action.payload.message;
  })
  .addCase(deleteMessage, (state) => {
    state.successDelete = '';
  })
  .addCase(deleteMessageUpdate, (state) => {
    state.successUpdate = '';
  })
});

export default technoReducer;
