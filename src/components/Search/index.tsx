/* eslint-disable max-len */
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';
import {
  changeInputSearchField, updatedResultsProjects, onlyTechnoList, allTechnoList, updatedResultsTechno, getAllTechnos,
} from '../../store/reducers/search';
import { ITechnoProjet, Project } from '../../@types/project';
import ResultsCount from './ResultsCount';
import TechnosButtons from './TechnosButtons';
import InputSearch from './InputSearch';
import { searchProjectByTitle, searchProjectByTechno } from '../../store/selectors/search';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchProject() {

  // Récupération des states
  const technosList = useAppSelector((state) => state.search.technoLists);
  const searchValue = useAppSelector((state) => state.search.inputValue);
  const resultsSearch = useAppSelector((state) => state.search.resultsSearch);
  const resultsSearchByTechno = useAppSelector((state) => state.search.resultsSearchByTechno);
  const projectsList = useAppSelector((state) => state.projects.lists);
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === '/search') {
      dispatch(getAllTechnos());
    }
  }, [dispatch, location]);

  const activeSearched = useAppSelector((state) => state.search.activeSearched);
  // Récupération du dispatch pour les actions du reducer
  // Recherche du projet par input et techno
  const submitChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    // On récupère la valeur de l'input et modification du state inputValue
    const newValue = event.currentTarget.value;
    dispatch(changeInputSearchField(newValue));
    // On check la quantité de techno séléctionné
    const matchProject = technosList.length === 1
      // Si une seule techno, on filtre la recherche de l'input dans le state resultsSearchByTechno qui contient les projets recherché par techno
      ? resultsSearchByTechno.filter((project) => searchProjectByTitle(project, newValue))
      // Si une plusieurs technos, on filtre la recherche de l'input dans le state projectsList qui contient tout les projets
      : projectsList.filter((project) => searchProjectByTitle(project, newValue));
    // Si l'input est vide, on envoi resultsSearchByTechno dans le state du resultsSearch sinon on envoi le résultat de la recherche
    const updatedResults = newValue.length === 0 ? resultsSearchByTechno : matchProject;
    dispatch(updatedResultsProjects(updatedResults as Project[]));
  };

  // Gérer la recherche par technologie utilisée
  // On créer les fonctions qui vont effectuer les recherches via le selector search
  const filterProjectsByTitle = (value: string) => projectsList.filter((project) => searchProjectByTitle(project, value)) as Project[];
  const filterProjectsByTechno = (technoSearched: string) => projectsList.filter((project) => searchProjectByTechno(project, technoSearched)) as Project[];
  const filterProjectsByTechnoInResults = (technoSearched: string) => resultsSearch.filter((project) => searchProjectByTechno(project, technoSearched)) as Project[];

  // On réagit au clic sur les boutons technologies
  const submitChangeTechno = (event: React.MouseEvent<HTMLButtonElement>) => {
    // On récupère la valeur du bouton et on cherche la correspondance dans la liste des technos
    const technoSearched = event.currentTarget.textContent as string;

    const technoItem = technosList.find((item) => item.label === technoSearched);


    if (technosList.length === 1) {
      // Si une seule techno déja sélectionné, on remet l'ensemble des technos dans le state technosList
      dispatch(allTechnoList(technosList));
      // Si l'input est vide, on initialise le state resultsSearch à vide, sinon on récupère la liste des projets recherché dans l'input et insertion dans le state
      dispatch(updatedResultsProjects(searchValue.length === 0 ? [] : filterProjectsByTitle(searchValue)));
    } else {
      // Si plusieurs techno était affiché, on modifie le state technosList avec la techno recherché
      dispatch(onlyTechnoList(technoItem as ITechnoProjet));
      // On filtre les projets soit par techno uniquement si l'input est vide soit par les recherches déja effectués avec l'input
      const filterProjects = searchValue.length === 0 ? filterProjectsByTechno(technoSearched) : filterProjectsByTechnoInResults(technoSearched);
      // On met à jour le state resultsSearch
      dispatch(updatedResultsProjects(filterProjects));
      // On met à jour le state resultsSearchByTechno pour pouvoir l'utiliser dans la recherche par input
      dispatch(updatedResultsTechno(filterProjects));
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
        numberProject={resultsSearch.length}
        activeSearched={activeSearched}
      />
      <div className="flex flex-col mb-10 mr-4 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10">
        {resultsSearch.map((item) => (
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
