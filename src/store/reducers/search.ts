import { createAction, createReducer } from '@reduxjs/toolkit';
import data from '../techno';
import { ITechnoProjet, Project } from '../../@types/project';

interface SearchState {
  lists: ITechnoProjet[];
  results: Project[]
  inputValue: string
  activeSearched: boolean
}

// Gestion du state initial des projets
export const initialState: SearchState = {
  lists: data,
  results: [],
  inputValue: '',
  activeSearched: false,
};

// Action qui déclenche la modification de l'input du state
export const changeInputSearchField = createAction<string>('settings/CHANGE_INPUT_SEARCH_FIELD');
export const updatedResultsProjects = createAction<Project[]>('settings/UPDATED_RESULTS_PROJECTS');
export const onlyTechnoList = createAction<ITechnoProjet>('settings/ONLY_TECHNO_LIST');
export const allTechnoList = createAction<ITechnoProjet[]>('settings/ALL_TECHNO_LIST');

// Gestion des actions du reducer
const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeInputSearchField, (state, action) => {
      state.inputValue = action.payload;
    })
    .addCase(updatedResultsProjects, (state, action) => {
      state.results = action.payload;
      state.activeSearched = true;
    })
    .addCase(onlyTechnoList, (state, action) => {
      state.lists = [];
      state.lists.push(action.payload);
      state.activeSearched = true;
    })
    .addCase(allTechnoList, (state) => {
      state.lists = data;
    });
});

export default searchReducer;
