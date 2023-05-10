// eslint-disable-next-line import/no-extraneous-dependencies
import { Search } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';
import {
  changeInputSearchField, updatedResultsProjects, onlyTechnoList, allTechnoList,
} from '../../store/reducers/search';
import { ITechnoProjet, Project } from '../../@types/project';
import ResultsCount from './ResultsCount';

function SearchProject() {
  const technosList = useAppSelector((state) => state.search.lists);
  const searchValue = useAppSelector((state) => state.search.inputValue);
  const projectResultSearch = useAppSelector((state) => state.search.results);
  const projectsList = useAppSelector((state) => state.projects.lists);
  const activeSearched = useAppSelector((state) => state.search.activeSearched);

  const dispatch = useAppDispatch();

  // Mettre à jour la valeur de recherche dans le state et recherché dans la liste de projet
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    dispatch(changeInputSearchField(newValue));
    // eslint-disable-next-line max-len
    const correspondenceProject = projectsList.filter((project) => project.title.toLowerCase().includes(newValue.toLowerCase()));
    // Mettre à jour les résultats de projet dans le state
    if (newValue.length === 0) {
      dispatch(updatedResultsProjects([]));
    } else {
      dispatch(updatedResultsProjects(correspondenceProject as Project[]));
    }
  };

  // Gérer la recherche par technologie utilisée
  const handleChangeTechno = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Récupérer la valeur du bouton cliqué (la technologie recherchée)
    const technoSearched = event.currentTarget.textContent;
    // Trouver l'élément de technologie correspondant dans la liste des technos
    const technoItem = technosList.find((item) => item.label === technoSearched);
    if (technosList.length === 1) {
      // Si la liste des technos ne contient qu'un seul élément
      // réinitialiser la liste complète des technos
      dispatch(allTechnoList(technosList));
      if (searchValue.length === 0) {
        // Si aucune recherche n'avait été mémorisé, vider les résultats de recherche
        dispatch(updatedResultsProjects([]));
      } else {
        // Filtrer les projets correspondant à la valeur de recherche
        // eslint-disable-next-line max-len
        const correspondenceProject = projectsList.filter((project) => project.title.toLowerCase().includes(searchValue.toLowerCase()));
        dispatch(updatedResultsProjects(correspondenceProject as Project[]));
      }
    } else {
      // Sinon, mettre à jour la liste des technos avec l'élément sélectionné
      // et charger les résultats de projet correspondants
      dispatch(onlyTechnoList(technoItem as ITechnoProjet));
      // eslint-disable-next-line max-len
      if (searchValue.length === 0) {
        // Filtrer les projets correspondant à la technologie sélectionnée
        // eslint-disable-next-line max-len
        const correspondenceTechno = projectsList.filter((project) => project.techno_projet.find((techno) => techno.label === technoSearched));
        dispatch(updatedResultsProjects(correspondenceTechno as Project[]));
      } else {
        // Filtrer les projets correspondant à la technologie sélectionnée
        // dans les résultats de recherche actuels
        // eslint-disable-next-line max-len
        const correspondenceTechno = projectResultSearch.filter((project) => project.techno_projet.find((techno) => techno.label === technoSearched));
        dispatch(updatedResultsProjects(correspondenceTechno as Project[]));
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex justify-center rounded-xl w-[70%]">
        <form className="w-full bg-primary0 px-2 py-3 rounded-xl opacity-75 m-1 ">
          <div className="flex justify-between">
            <div className="flex gap-2 text-[white] w-full">
              <Search />
              <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
              <input onChange={handleChangeValue} defaultValue={searchValue} type="search" id="default-search" className="text-sm bg-primary0 placeholder-[white] w-full" placeholder="Search Projects" required />
            </div>
          </div>
        </form>
      </div>

      <div className="flex space-x-2 justify-center flex-wrap gap-5 pb-5 rounded w-[70%] mt-5">
        {technosList.map((techno) => (
          <button onClick={handleChangeTechno} className="py-2 px-4 rounded-full w-[40%] sm:w-[20%]" style={{ backgroundColor: `#${techno.color}` }} type="button" key={techno.id}>{techno.label}</button>
        ))}
      </div>
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
