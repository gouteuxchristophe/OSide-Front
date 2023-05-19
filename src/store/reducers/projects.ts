import { createAction, createReducer } from '@reduxjs/toolkit';
import data from '../data';
import { Project } from '../../@types/project';
import axiosInstance from '../../utils/axios';
import createAppAsyncThunk from '../../utils/redux';

// Je créer mon interface pour le state de mon reducer
interface ProjectsState {
  lists: Project[];
  errorApiProjects: string | null;
  projectByID: Project;
  dataReception: boolean
  isLoading: boolean;
}

interface UpdateProject {
  id: number | undefined;
  title: string | undefined;
  content: string | undefined;
}

// Je créer mon state initial
export const initialState: ProjectsState = {
  lists: []	,
  errorApiProjects: null,
  projectByID: {} as Project,
  dataReception: false,
  isLoading: true
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

// Action creator qui me permet de récupérer tous les projets
export const getProjectByID = createAppAsyncThunk('projects/GET_PROJECT_BY_ID',
 async (idProject: number, thunkAPI) => { 
  try {
    const { data } = await axiosInstance.get(`/projet/${idProject}`);
    return data as Project;
  } catch (err: any) {
    if (err) {
      thunkAPI.dispatch(setProjectErrorMessage(err.response.data));
    } else {
      console.error(err);
      thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite'));
    }
  }
});

export const updateProject = createAppAsyncThunk(
  'projet/UPDATE_PROJET',
  async (project: UpdateProject, thunkAPI) => {
    try {
      const { data } = await axiosInstance.put(`/projet/${project.id}`, project);
      return data as Project;
    } catch (err: any) {
      if (err.response?.data) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
      throw err;
    }
  },
);

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
      state.dataReception = true;
    })
    .addCase(getProjectByID.rejected, (state) => {
      state.errorApiProjects = null;
    })
    .addCase(getProjectByID.fulfilled, (state, action) => {
      state.errorApiProjects = null;
      state.projectByID = action.payload!;
      state.isLoading = false;
    })
});

export default projectsReducer;
