import { createReducer } from '@reduxjs/toolkit';
import data from '../data';
import { Project } from '../../@types/project';

interface ProjectsState {
  lists: Project[];
}

// Gestion du state initial des projets
export const initialState: ProjectsState = {
  lists: data,
};

// Gestion des actions du reducer
const projectsReducer = createReducer(initialState, () => {

});

export default projectsReducer;
