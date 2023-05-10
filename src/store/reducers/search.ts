import { createAction, createReducer } from '@reduxjs/toolkit';
import data from '../techno';
import { ITechnoProjet, Project } from '../../@types/project';

interface SearchState {
  technoLists: ITechnoProjet[];
  resultsSearch: Project[]
  resultsSearchByTechno: Project[]
  inputValue: string
  activeSearched: boolean
}

// Gestion du state initial des projets
export const initialState: SearchState = {
  technoLists: data,
  resultsSearch: [],
  resultsSearchByTechno: [],
  inputValue: '',
  activeSearched: false,
};

// Action qui déclenche la modification de l'input du state
export const changeInputSearchField = createAction<string>('settings/CHANGE_INPUT_SEARCH_FIELD');
export const updatedResultsProjects = createAction<Project[]>('settings/UPDATED_RESULTS_PROJECTS');
export const updatedResultsTechno = createAction<Project[]>('settings/UPDATED_RESULTS_TECHNO');
export const onlyTechnoList = createAction<ITechnoProjet>('settings/ONLY_TECHNO_LIST');
export const allTechnoList = createAction<ITechnoProjet[]>('settings/ALL_TECHNO_LIST');

// Gestion des actions du reducer
const searchReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeInputSearchField, (state, action) => {
      state.inputValue = action.payload;
    })
    .addCase(updatedResultsProjects, (state, action) => {
      state.resultsSearch = action.payload;
      state.activeSearched = true;
    })
    .addCase(updatedResultsTechno, (state, action) => {
      state.resultsSearchByTechno = action.payload;
    })
    .addCase(onlyTechnoList, (state, action) => {
      state.technoLists = [];
      state.technoLists.push(action.payload);
      state.activeSearched = true;
    })
    .addCase(allTechnoList, (state) => {
      state.technoLists = data;
      state.resultsSearchByTechno = [];
    });
});

export default searchReducer;
