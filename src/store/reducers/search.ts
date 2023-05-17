import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { ITechnoProjet, Project } from '../../@types/project';
import axiosInstance from '../../utils/axios';


// Je créer mon interface pour le state de mon reducer
interface SearchState {
  technoLists: ITechnoProjet[];
  resultsSearch: Project[]
  resultsSearchByTechno: Project[]
  inputValue: string
  activeSearched: boolean
  initDatas: ITechnoProjet[]
}

// Je créer mon state initial
export const initialState: SearchState = {
  technoLists: [],
  resultsSearch: [],
  resultsSearchByTechno: [],
  inputValue: '',
  activeSearched: false,
  initDatas: []
};

export const getAllTechnos = createAsyncThunk(
  'technos/GET_All_TECHNO',
  async () => {
    try {
      const { data } = await axiosInstance.get('/techno');
      return data as ITechnoProjet[];
    } catch (err: any) {
      if (err.response?.data) {
        console.log(err.response.data);
      } else {
        console.error(err);
      }
      throw err;
    }
  },
);

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
    .addCase(getAllTechnos.fulfilled, (state, action) => {
      state.initDatas = action.payload;
      state.technoLists = state.initDatas;
    })
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
      state.technoLists = state.initDatas;
      state.resultsSearchByTechno = [];
    })
});

export default searchReducer;
