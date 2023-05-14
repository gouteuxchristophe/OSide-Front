import { createAction, createReducer } from '@reduxjs/toolkit';
import data from '../techno';
import { ITechnoProjet, Project } from '../../@types/project';

// Je créer mon interface pour le state de mon reducer
interface SearchState {
  technoLists: ITechnoProjet[];
  resultsSearch: Project[]
  resultsSearchByTechno: Project[]
  inputValue: string
  activeSearched: boolean
}

// Je créer mon state initial
export const initialState: SearchState = {
  technoLists: data,
  resultsSearch: [],
  resultsSearchByTechno: [],
  inputValue: '',
  activeSearched: false,
};

// Action creator qui me permet de changer la valeur d'un champ de mon formulaire
export const changeInputSearchField = createAction<string>('settings/CHANGE_INPUT_SEARCH_FIELD');
// Action creator qui me permet de récupérer les résultats de la recherche
export const updatedResultsProjects = createAction<Project[]>('settings/UPDATED_RESULTS_PROJECTS');
// Action creator qui me permet de récupérer les résultats de la recherche par techno
export const updatedResultsTechno = createAction<Project[]>('settings/UPDATED_RESULTS_TECHNO');
// Action creator qui me permet de récupérer la techno sélectionnée
export const onlyTechnoList = createAction<ITechnoProjet>('settings/ONLY_TECHNO_LIST');
// Action creator qui me permet de récupérer toutes les techno
export const allTechnoList = createAction<ITechnoProjet[]>('settings/ALL_TECHNO_LIST');

// Je créer mon reducer
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
