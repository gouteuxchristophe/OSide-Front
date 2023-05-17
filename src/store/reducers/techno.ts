import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ITechnoProjet } from '../../@types/project';
import axiosInstance from '../../utils/axios';

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

export const updateTechno = createAsyncThunk(
  'technos/PUT_TECHNO',
  async (techno: ITechnoProjet) => {
    
      try {
        const { data } = await axiosInstance.put(`/techno/${techno.id as number}`, {
          label: techno.label,
          color: techno.color,
        }
        );
        console.log(data);
        
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

// Je créer mon reducer
const technoReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTechno.fulfilled, (state, action) => {
    state.message = action.payload.message;
  })
  builder.addCase(updateTechno.rejected, (state, action) => {
    
  })
  .addCase(updatedSelectedTechnos, (state, action) => {
    state.selectedTechnos = action.payload;
  })
});

export default technoReducer;
