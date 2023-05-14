import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import data from '../data';
import { Project } from '../../@types/project';
import axiosInstance from '../../utils/axios';

// Je créer mon interface pour le state de mon reducer
interface ProjectsState {
  lists: Project[];
  isLoading: boolean;
}

// Je créer mon state initial
export const initialState: ProjectsState = {
  lists: data,
  isLoading: false,
};
// Action creator qui me permet de récupérer tous les projets
export const getAllProjects = createAsyncThunk('projects/GET_ALL_PROJECTS', async () => {
  const { data: projects } = await axiosInstance.get('/projet');
  return projects as Project[];
});

// Je créer mon reducer
const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lists = action.payload;
    });
});

export default projectsReducer;
