import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ITechnoProjet } from '../../@types/project';
import axiosInstance from '../../utils/axios';
import createAppAsyncThunk from '../../utils/redux';
import { newTechno } from '../../components/Modals/AddTechno';

interface technoState {
  message: string;
  selectedTechnos: ITechnoProjet[];
}

// Je créer mon state initial
export const initialState: technoState = {
  message: '',
  selectedTechnos: [],
};

export const updatedSelectedTechnos = createAction<newTechno[]>('technos/UPDATED_SELECTED_TECHNO');

export const addTechno = createAppAsyncThunk(
  'technos/ADD_TECHNO',
  async (techno: newTechno[], thunkAPI) => {
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

// Je créer mon reducer
const technoReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTechno.fulfilled, (state, action) => {
    state.message = action.payload.message;
  })
  .addCase(updatedSelectedTechnos, (state, action) => {
    state.selectedTechnos = action.payload;
  })
});

export default technoReducer;
