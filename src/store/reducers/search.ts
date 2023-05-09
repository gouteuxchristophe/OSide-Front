import { createAction, createReducer } from '@reduxjs/toolkit';
import data from '../techno';
import { ITechnoProjet, Project } from '../../@types/project';

interface SearchState {
  lists: ITechnoProjet[];
  results: Project[]
  inputValue: string
}

// Gestion du state initial des projets
export const initialState: SearchState = {
  lists: data,
  results: [],
  inputValue: 'Un super projet',
};

// Action qui déclenche la modification de l'input du state
export const changeInputSearchField = createAction<string>('settings/CHANGE_INPUT_SEARCH_FIELD');
export const updatedResultsProjects = createAction<Project[]>('settings/UPDATED_RESULTS_PROJECTS');

// Gestion des actions du reducer
const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeInputSearchField, (state, action) => {
      state.inputValue = action.payload;
    })
    .addCase(updatedResultsProjects, (state, action) => {
      state.results = [];
      state.results = action.payload;
    });
});

export default searchReducer;
