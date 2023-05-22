import { createAction, createReducer } from '@reduxjs/toolkit';
import { Project } from '../../@types/project';
import axiosInstance from '../../utils/axios';
import createAppAsyncThunk from '../../utils/redux';

export interface newProject {
  title: string;
  content: string;
  status: string;
  owner_id: number;
  technoProjet: number[];
}
// Je créer mon interface pour le state de mon reducer
interface ProjectsState {
  lists: Project[];
  errorApiProjects: string | null;
  projectByID: Project;
  dataReception: boolean
  isLoading: boolean;
  successAdd: string,
  idNewProject: number;
  successUpdate: string,
}

interface UpdateProject {
  id: any;
  title: string | undefined;
  content: string | undefined;
  status: string | undefined;
  technoProjet: number[]
}

// Je créer mon state initial
export const initialState: ProjectsState = {
  lists: [],
  errorApiProjects: null,
  projectByID: {} as Project,
  dataReception: false,
  isLoading: true,
  successAdd: '',
  idNewProject: 0,
  successUpdate: '',
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


// Action creator qui me permet de créer un projet
export const createProject = createAppAsyncThunk(
  'projet/CREATE_PROJET',
  async (project: newProject, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/projet', project);
      console.log(data);
      return data;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
      throw err;
    }
  },
);

export const updateProject = createAppAsyncThunk(
  'projet/UPDATE_PROJET',
  async (project: UpdateProject, thunkAPI) => {
    console.log(project);
    try {
      const { data } = await axiosInstance.put(`/projet/${project.id}`, {
        title: project.title,
        content: project.content,
        status: project.status,
        technoProjet: project.technoProjet,
      });
      return data;
    } catch (err: any) {
      if (err) {
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

export const deleteMessageAdd = createAction('project/DELETE_SUCCESS_ADD');
export const deleteMessageUpdate = createAction('project/DELETE_SUCCESS_UPDATE');
export const deleteMessageDelete = createAction('project/DELETE_SUCCESS_DELETE');

export const setProjectErrorMessage = createAction<string>('project/SET_PROJECT_ERROR_MESSAGE');

// Je créer mon reducer
const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteMessageAdd, (state) => {
      state.successAdd = '';
    })
    .addCase(deleteMessageUpdate, (state) => {
      state.successUpdate = '';
    })
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
    .addCase(updateProject.fulfilled, (state) => {
      state.successUpdate = 'Projet modifié avec succès';
    })
    .addCase(updateProject.rejected, (state) => {
      state.errorApiProjects = null;
    })
    .addCase(getProjectByID.rejected, (state) => {
      state.errorApiProjects = null;
    })
    .addCase(getProjectByID.fulfilled, (state, action) => {
      state.errorApiProjects = null;
      state.projectByID = action.payload!;
      state.isLoading = false;
    })
    .addCase(createProject.rejected, (state) => {
      state.errorApiProjects = null;
    })
    .addCase(createProject.fulfilled, (state, action) => {
      state.errorApiProjects = null;
      state.lists.push(action.payload!);
      state.successAdd = 'Projet ajouté avec succès';
      state.idNewProject = action.payload.result.id;
    })

});

export default projectsReducer;