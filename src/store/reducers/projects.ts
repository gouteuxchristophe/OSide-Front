import { createAction, createReducer } from '@reduxjs/toolkit';
import data from '../data';
import { Project } from '../../@types/project';
import axiosInstance from '../../utils/axios';
import createAppAsyncThunk from '../../utils/redux';

// Je créer mon interface pour le state de mon reducer
interface ProjectsState {
  lists: Project[];
  errorApiProjects: string | null;
}

// Je créer mon state initial
export const initialState: ProjectsState = {
  lists: []	,
  errorApiProjects: null,
};
// Action creator qui me permet de récupérer tous les projets
export const getAllProjects = createAppAsyncThunk('projects/GET_ALL_PROJECTS',
 async (_, thunkAPI) => {
  try {
    const { data: projects } = await axiosInstance.get('/projet');
    return projects as Project[];
  } catch (err: any) {
    if (err) {
      thunkAPI.dispatch(setProjectErrorMessage(err.response.data));
    } else {
      console.error(err);
      thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite'));
    }
  }
});

// Gestions des messages d'erreur
export const setProjectErrorMessage = createAction<string>('project/SET_PROJECT_ERROR_MESSAGE');

// Je créer mon reducer
const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProjectErrorMessage, (state, action) => {
      state.errorApiProjects = action.payload;
    })
    .addCase(getAllProjects.rejected, (state) => {
      state.errorApiProjects = null;
    })
    .addCase(getAllProjects.fulfilled, (state, action) => {
      state.errorApiProjects = null;
      state.lists = action.payload!;
    });
});

export default projectsReducer;
