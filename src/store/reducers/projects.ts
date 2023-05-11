import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import data from '../data';
import { Project } from '../../@types/project';
import axiosInstance from '../../utils/axios';

interface ProjectsState {
  lists: Project[];
  isLoading: boolean;
}

// Gestion du state initial des projets
export const initialState: ProjectsState = {
  lists: data,
  isLoading: false,
};

export const getAllProjects = createAsyncThunk('projects/GET_ALL_PROJECTS', async () => {
  const { data: projects } = await axiosInstance.get('/projet', {
    headers: {
      'Access-Control-Allow-Origin': 'privatekey',
      'Content-Type': 'application/json',
    },
  });
  return projects as Project[];
});

// Gestion des actions du reducer
const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lists = action.payload;
    });
});

export default projectsReducer;
