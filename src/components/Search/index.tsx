/* eslint-disable max-len */
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';
import {
  changeInputSearchField, updatedResultsProjects, onlyTechnoList, allTechnoList,
} from '../../store/reducers/search';
import { ITechnoProjet, Project } from '../../@types/project';
import ResultsCount from './ResultsCount';
import TechnosButtons from './TechnosButtons';
import InputSearch from './InputSearch';
import { searchProjectByTitle, searchProjectByTechno } from '../../store/selectors/search';

function SearchProject() {
  const technosList = useAppSelector((state) => state.search.lists);
  const searchValue = useAppSelector((state) => state.search.inputValue);
  const projectResultSearch = useAppSelector((state) => state.search.results);
  const projectsList = useAppSelector((state) => state.projects.lists);
  const activeSearched = useAppSelector((state) => state.search.activeSearched);

  const dispatch = useAppDispatch();

  // Mettre à jour la valeur de recherche dans le state et recherché dans la liste de projet
  const submitChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    dispatch(changeInputSearchField(newValue));
    let matchProject = [];
    if (technosList.length === 1) {
      matchProject = projectResultSearch.filter((project) => searchProjectByTitle(project, newValue));
    } else {
      matchProject = projectsList.filter((project) => searchProjectByTitle(project, newValue));
    }
    // Mettre à jour les résultats de projet dans le state
    if (newValue.length === 0) {
      dispatch(updatedResultsProjects([]));
    } else {
      dispatch(updatedResultsProjects(matchProject as Project[]));
    }
  };

  // Gérer la recherche par technologie utilisée
  const filterProjectsByTitle = (value: string) => projectsList.filter((project) => searchProjectByTitle(project, value)) as Project[];
  const filterProjectsByTechno = (technoSearched: string) => projectsList.filter((project) => searchProjectByTechno(project, technoSearched)) as Project[];
  const filterProjectsByTechnoInResults = (technoSearched: string) => projectResultSearch.filter((project) => searchProjectByTechno(project, technoSearched)) as Project[];

  const submitChangeTechno = (event: React.MouseEvent<HTMLButtonElement>) => {
    const technoSearched = event.currentTarget.textContent as string;
    const technoItem = technosList.find((item) => item.label === technoSearched);

    if (technosList.length === 1) {
      dispatch(allTechnoList(technosList));
      if (searchValue.length === 0) {
        dispatch(updatedResultsProjects([]));
      } else {
        dispatch(updatedResultsProjects(filterProjectsByTitle(searchValue)));
      }
    } else {
      dispatch(onlyTechnoList(technoItem as ITechnoProjet));
      if (searchValue.length === 0) {
        dispatch(updatedResultsProjects(filterProjectsByTechno(technoSearched)));
      } else {
        dispatch(updatedResultsProjects(filterProjectsByTechnoInResults(technoSearched)));
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex justify-center rounded-xl w-[70%]">
        <InputSearch
          defaultValue={searchValue}
          handleChangeValue={submitChangeValue}
        />
      </div>
      <TechnosButtons
        technosList={technosList}
        handleChangeTechno={submitChangeTechno}
      />

      <ResultsCount
        numberProject={projectResultSearch.length}
        activeSearched={activeSearched}
      />
      <div className="flex flex-col mb-10 mr-4 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10">
        {projectResultSearch.map((item) => (
          <ProjectItem
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchProject;
