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
  successDelete: string,
  successUpdate: string,
  idNewProject: number;
  credentialTitle: string;
  credentialContent: string;
}

interface credentialsAddProject {
  title: string;
  content: string;
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
  successDelete: '',
  successUpdate: '',
  idNewProject: 0,
  credentialTitle: '',
  credentialContent: '',
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
  }
);

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
    console.log('projet', project);
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
    }
  },
);
// Suppression d'un project
export const deleteProject = createAppAsyncThunk(
  'projet/DELETE_PROJET',
  async (idProject: number, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/projet/${idProject}`, idProject as any);
      return data;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data));
      } else {
        console.error(err);
        thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
    }
  },
);
// Action creator qui me permet de changer la valeur d'un champ de mon formulaire
export const changeCredentialsTitle = createAction<string>('project/CHANGE_CREDENTIALS_TITLE');
// Action creator qui me permet de changer la valeur d'un champ de mon formulaire
export const changeCredentialsContent = createAction<string>('project/CHANGE_CREDENTIALS_CONTENT');

// Action creator qui me permet de supprimer le message de succès d'ajout
export const deleteMessageAdd = createAction('project/DELETE_SUCCESS_ADD');
// Action creator qui me permet de supprimer le message de succès de modification
export const deleteMessageUpdate = createAction('project/DELETE_SUCCESS_UPDATE');
// Action creator qui me permet de supprimer le message de succès de suppression
export const deleteMessageDelete = createAction('project/DELETE_SUCCESS_DELETE');
// Gestions des messages d'erreur
export const setProjectErrorMessage = createAction<string>('project/SET_PROJECT_ERROR_MESSAGE');

// Je créer mon reducer
const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCredentialsTitle, (state, action) => {
      state.credentialTitle = action.payload;
    })
    .addCase(changeCredentialsContent, (state, action) => {
      state.credentialContent = action.payload;
    })
    // On vide le message de succès d'ajout
    .addCase(deleteMessageAdd, (state) => {
      state.successAdd = '';
    })
    // On vide le message de succès de modification
    .addCase(deleteMessageUpdate, (state) => {
      state.successUpdate = '';
    })
    // On vide le message de succès de suppression
    .addCase(deleteMessageDelete, (state) => {
      state.successDelete = '';
    })
    // On récupère le message d'erreur
    .addCase(setProjectErrorMessage, (state, action) => {
      state.errorApiProjects = action.payload;
    })
    // On gère le rejet de la requête qui récupère tous les projets
    .addCase(getAllProjects.rejected, (state) => {
      state.errorApiProjects = null;
    })
    // On gère la réussite de la requête qui récupère tous les projets
    .addCase(getAllProjects.fulfilled, (state, action) => {
      state.errorApiProjects = null;
      state.lists = action.payload!;
      state.dataReception = true;
    })
    // On gère la réussite de la requête qui modifie un projet
    .addCase(updateProject.fulfilled, (state) => {
      state.successUpdate = 'Projet modifié avec succès';
    })
    // On gère le rejet de la requête qui modifie un projet
    .addCase(updateProject.rejected, (state) => {
      state.errorApiProjects = null;
    })
    // On gère le rejet de la requête qui récupère un projet par son id
    .addCase(getProjectByID.rejected, (state) => {
      state.errorApiProjects = null;
    })
    // On gère la réussite de la requête qui récupère un projet par son id
    .addCase(getProjectByID.fulfilled, (state, action) => {
      state.errorApiProjects = null;
      state.projectByID = action.payload!;
      state.isLoading = false;
    })
    // On gère le rejet de la requête qui crée un projet
    .addCase(createProject.rejected, (state) => {
      state.errorApiProjects = null;
    })
    // On gère la réussite de la requête qui crée un projet
    .addCase(createProject.fulfilled, (state, action) => {
      state.errorApiProjects = null;
      state.lists.push(action.payload!);
      state.successAdd = 'Projet ajouté avec succès';
      state.idNewProject = action.payload.result.id;
      state.credentialTitle = '';
      state.credentialContent = '';
    })
    // On gère la réussite de la requête qui supprime un projet
    .addCase(deleteProject.fulfilled, (state, action) => {
      state.successDelete = 'Projet supprimé avec succès';
    })
    // On gère le rejet de la requête qui supprime un projet
    .addCase(deleteProject.rejected, (state) => {
      state.errorApiProjects = null;
    });
});

export default projectsReducer;