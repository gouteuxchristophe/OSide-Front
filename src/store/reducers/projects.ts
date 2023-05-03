import { createReducer } from '@reduxjs/toolkit';
import data from '../data';
import { Project } from '../../@types/project';

interface ProjectsState {
  projects: Project[];
}

export const initialState: ProjectsState = {
  projects: data,
};

// Gestion des actions du reducer
const projectsReducer = createReducer(initialState, () => {

});

export default projectsReducer;
