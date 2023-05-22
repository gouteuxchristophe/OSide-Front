import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ITechnoProjet } from '../../@types/project';
import axiosInstance from '../../utils/axios';
import { newTechno } from '../../components/Modals/AddTechno';
import createAppAsyncThunk from '../../utils/redux';
import { getTechnosAPI } from './search';

interface technoState {
  technoLists: ITechnoProjet[];
  message: string;
  successAdd: string;
  successDelete: string;
  successUpdate: string;
  selectedTechnos: ITechnoProjet[];
  errorApiTechno: string | null;
}

// Je créer mon state initial
export const initialState: technoState = {
  technoLists: [],
  message: '',
  successAdd: '',
  successDelete: '',
  successUpdate: '',
  selectedTechnos: [],
  errorApiTechno: null,
};

// Requete API pour récupérer toutes les technos
export const getAllTechnos = createAppAsyncThunk(
  'technos/GET_All_TECHNO',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/techno');
      // Je dispatch l'action getTechnosAPI pour mettre à jour mon state search
      thunkAPI.dispatch(getTechnosAPI(data));
      return data as ITechnoProjet[];
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setTechnoErrorMessage(err.response.data));
      } else {
        thunkAPI.dispatch(setTechnoErrorMessage('Une erreur s\'est produite'));
      }
    }
  },
);

// Requete API pour ajouter une techno
export const addTechno = createAppAsyncThunk(
  'technos/ADD_TECHNO',
  async (techno: newTechno[], thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/techno`, techno);
      return data as technoState;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setTechnoErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setTechnoErrorMessage('Une erreur s\'est produite'));
      }
    }
  },
);

// Requete API pour modifier une techno
export const updateTechno = createAppAsyncThunk(
  'technos/PUT_TECHNO',
  async (techno: ITechnoProjet, thunkAPI) => {
      try {
        const { data } = await axiosInstance.put(`/techno/${techno.id as number}`, {
          label: techno.label,
          color: techno.color,
        }
        );
        return data;
      } catch (err: any) {
        if (err) {
          thunkAPI.dispatch(setTechnoErrorMessage(err.response.data));
        } else {
          console.error(err);
          thunkAPI.dispatch(setTechnoErrorMessage('Une erreur s\'est produite'));
        }
      }
  },
);


// Requete API pour supprimer une techno
export const deleteTechno = createAppAsyncThunk(
  'technos/DELETE_TECHNO',
  async (idTechno: number, thunkAPI) => {
      try {
        const { data } = await axiosInstance.delete(`/techno/${idTechno}`, idTechno as any);
        return data;
      } catch (err: any) {
        if (err) {
          thunkAPI.dispatch(setTechnoErrorMessage(err.response.data));
        } else {
          console.error(err);
          thunkAPI.dispatch(setTechnoErrorMessage('Une erreur s\'est produite'));
        }
      }
  },
);

// Action creator qui me permet de mettre à jour le tableau des technos sélectionnées
export const updatedSelectedTechnos = createAction<newTechno[]>('technos/UPDATED_SELECTED_TECHNO');
// Gestions des messages d'erreur
export const setTechnoErrorMessage = createAction<string>('techno/SET_Techno_ERROR_MESSAGE');
// Action qui vide le tableau des technos sélectionnées lors de l'ajout l'update
export const emptySelectedTechnos = createAction('technos/EMPTY_SELECTED_TECHNO');
// Action creator qui me permet de supprimer le message de succès de la suppression d'une techno
export const deleteMessage = createAction('technos/DELETE_MESSAGE');
// Action creator qui me permet de supprimer le message de succès de la modification d'une techno
export const deleteMessageUpdate = createAction('technos/DELETE_SUCCESS');
// Action creator qui me permet de supprimer le message de succès de l'ajout d'une techno
export const deleteMessageAdd = createAction('technos/DELETE_SUCCESS_ADD');

// Je créer mon reducer
const technoReducer = createReducer(initialState, (builder) => {
  builder
  // On vide le tableau des technos sélectionnées
  .addCase(emptySelectedTechnos, (state) => {
    state.selectedTechnos = [];
  })
  // On gère le message d'erreur
  .addCase(setTechnoErrorMessage, (state, action) => {
    state.errorApiTechno = action.payload;
  })
  // On gère le rejet de la requête qui récupère toutes les technos
  .addCase(getAllTechnos.rejected, (state) => {
    state.errorApiTechno = null;
  })
  // On gère le succès de la requête qui récupère toutes les technos
  .addCase(getAllTechnos.fulfilled, (state, action) => {
    state.technoLists = action.payload!;
  })
  // On gère le rejet de la requête qui me permet d'ajouter une techno
  .addCase(addTechno.rejected, (state) => {
    state.errorApiTechno = null;
  })
  // On gère la réussite de la requête qui me permet d'ajouter une techno
  .addCase(addTechno.fulfilled, (state, action) => {
    state.successAdd = action.payload!.message;
  })
  // On gère le rejet de la requête qui me permet de modifier une techno
  .addCase(updatedSelectedTechnos, (state, action) => {
    state.selectedTechnos = action.payload;
  })
  // On gère le rejet de la requête qui me permet de supprimer une techno
  .addCase(deleteTechno.rejected, (state) => {
    state.errorApiTechno = null;
  })
  // On gère la réussite de la requête qui me permet de supprimer une techno
  .addCase(deleteTechno.fulfilled, (state, action) => {
    state.successDelete = action.payload.message;
  })
  // On gère le rejet de la requête qui me permet de modifier une techno
  .addCase(updateTechno.rejected, (state) => {
    state.errorApiTechno = null;
  })
  // On gère la réussite de la requête qui me permet de modifier une techno
  .addCase(updateTechno.fulfilled, (state, action) => {
    state.successUpdate = action.payload.message;
  })
  // On vide le message de succès du delete
  .addCase(deleteMessage, (state) => {
    state.successDelete = '';
  })
  // On vide le message de succès de l'update
  .addCase(deleteMessageUpdate, (state) => {
    state.successUpdate = '';
  })
  // On vide le message de succès de l'ajout
  .addCase(deleteMessageAdd, (state) => {
    state.successAdd = '';
  })
});

export default technoReducer;
