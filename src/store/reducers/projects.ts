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
  errorApiProjects: string
  projectByID: Project;
  dataReception: boolean
  isLoading: boolean;
  successAdd: string,
  successDelete: string,
  successUpdate: string,
  idNewProject: number;
  credentialTitle: string;
  credentialContent: string;
  successParticipate: boolean;
  successLeave: boolean;
  temporaryUpdatedInputProject: UpdateProject;
}

interface UpdateProject {
  id: any;
  title: string | undefined;
  content: string | undefined;
  status: string | undefined;
  technoProjet?: number[]
}

interface ParticipateProject {
  id: any;
  userId: number;
  }

// Je créer mon state initial
export const initialState: ProjectsState = {
  lists: [],
  errorApiProjects: '',
  projectByID: {} as Project,
  dataReception: false,
  isLoading: true,
  successAdd: '',
  successDelete: '',
  successUpdate: '',
  idNewProject: 0,
  credentialTitle: '',
  credentialContent: '',
  successParticipate: false,
  successLeave: false,
  temporaryUpdatedInputProject: {
    id: 0,
    title: '',
    content: '',
    status: '',
  },
};
// Action creator qui me permet de récupérer tous les projets
export const getAllProjects = createAppAsyncThunk('projects/GET_ALL_PROJECTS',
  async (_, thunkAPI) => {
    try {
      const { data: projects } = await axiosInstance.get('/projet');
      return projects as Project[];
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data.message));
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
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data.message));
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
      return data
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data.message));
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
    try {
      const { data } = await axiosInstance.put(`/projet/${project.id}`, {
        title: project.title,
        content: project.content,
        status: project.status,
        technoProjet: project.technoProjet,
      });
      return data.message;
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data.message));
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
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data.message as string));
      } else {
        console.error(err);
        thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
    }
  },
);
// Participer à un projet
export const participateProject = createAppAsyncThunk(
  'projet/PARTICIPATE_PROJET',
  async (project: ParticipateProject, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/projet/${project.id}/participate`, {
        memberProject: {
          id: project.userId
        }
      })
      return data
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data.message as string));
      } else {
        console.error(err);
        thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
    }
});
// Quitter un projet
export const leaveProject = createAppAsyncThunk(
  'projet/LEAVE_PROJET',
  async (project: ParticipateProject, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(`/projet/${project.id}/leave`, {
        memberProject: {
          id: project.userId
        }
      })
      return data
    } catch (err: any) {
      if (err) {
        thunkAPI.dispatch(setProjectErrorMessage(err.response.data.message as string));
      } else {
        console.error(err);
        thunkAPI.dispatch(setProjectErrorMessage('Une erreur s\'est produite lors de la connexion.'));
      }
    }
});

// On créer une action pour stocker les valeurs du formulaire update dans le state
export const changeInputProject = createAction<UpdateProject>('project/CHANGE_INPUT_PROJECT');
// On créer une action pour vider les valeurs du formulaire update dans le state
export const resetInputProject = createAction('project/RESET_INPUT_PROJECT');
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
export const deleteProjectErrorMessage = createAction('project/DELETE_PROJECT_ERROR_MESSAGE');
// On vide le message de succès de participation
export const deleteMessageParticipate = createAction('project/DELETE_SUCCESS_PARTICIPATE');
export const deleteMessageLeave = createAction('project/DELETE_SUCCESS_LEAVE');
// Je créer mon reducer
const projectsReducer = createReducer(initialState, (builder) => {
  builder
  // On récupère le titre du projet
    .addCase(changeCredentialsTitle, (state, action) => {
      state.credentialTitle = action.payload;
    })
    // On récupère le contenu du projet
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
    .addCase(deleteProjectErrorMessage, (state) => {
      state.errorApiProjects = '';
    })
    // On gère la réussite de la requête qui récupère tous les projets
    .addCase(getAllProjects.fulfilled, (state, action) => {
      if (action.payload === undefined) {
        return;
      }
      state.lists = action.payload!;
      state.dataReception = true;
    })
    // On gère la réussite de la requête qui modifie un projet
    .addCase(updateProject.fulfilled, (state, action) => {
      state.successUpdate = action.payload as string;
    })
    // On gère la réussite de la requête qui récupère un projet par son id
    .addCase(getProjectByID.fulfilled, (state, action) => {
      state.projectByID = action.payload!;
      state.isLoading = false;
    })
    // On gère la réussite de la requête qui crée un projet
    .addCase(createProject.fulfilled, (state, action) => {
      if (action.payload === undefined) {
        return;
      }
      state.lists.push(action.payload!);
      state.successAdd = action.payload.message as string;
      state.idNewProject = action.payload.result.id;
      state.credentialTitle = '';
      state.credentialContent = '';
    })
    // On gère la réussite de la requête qui supprime un projet
    .addCase(deleteProject.fulfilled, (state, action) => {
      state.successDelete = action.payload.message;
    })
    .addCase(participateProject.fulfilled, (state, action) => {
      state.successParticipate = action.payload.message
    })
    .addCase(deleteMessageParticipate, (state) => {
      state.successParticipate = false
    })
    .addCase(leaveProject.fulfilled, (state, action) => {
      state.successLeave = action.payload.message
    })
    .addCase(deleteMessageLeave, (state) => {
      state.successLeave = false
    })
    .addCase(changeInputProject, (state, action) => {
      state.temporaryUpdatedInputProject = action.payload;
    }
    )
    .addCase(resetInputProject, (state) => {
      state.temporaryUpdatedInputProject = initialState.temporaryUpdatedInputProject;
    })

});

export default projectsReducer;