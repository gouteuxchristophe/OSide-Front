import { createReducer } from '@reduxjs/toolkit';
import data from '../techno';
import { ITechnoProjet } from '../../@types/project';

interface ProjectsState {
  lists: ITechnoProjet[];
}

// Gestion du state initial des projets
export const initialState: ProjectsState = {
  lists: data,
};

// Gestion des actions du reducer
const technosReducer = createReducer(initialState, () => {

});

export default technosReducer;
