import { Search } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';
import { changeInputSearchField, updatedResultsProjects } from '../../store/reducers/search';
import { Project } from '../../@types/project';

function SearchProject() {
  const technosList = useAppSelector((state) => state.search.lists);
  const searchValue = useAppSelector((state) => state.search.inputValue);
  const projetSearched = useAppSelector((state) => state.search.results);
  const projectsList = useAppSelector((state) => state.projects.lists);

  const dispatch = useAppDispatch();

  function handleSearchSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    // eslint-disable-next-line max-len
    const correspondance = projectsList.filter((projet) => projet.title.toLowerCase().includes(searchValue));
    dispatch(updatedResultsProjects(correspondance as Project[]));
  }

  // dispatch(updatedResultsProjects(findProject as Project));

  function handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    dispatch(changeInputSearchField(newValue));
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex justify-center border-b-4 border-solid border-secondary20 w-[90%] mx-auto rounded-full">
        <form onSubmit={handleSearchSubmit} className="w-full rounded bg-primary0 px-2 py-3">
          <div className="flex justify-between">
            <div className="flex gap-2 text-[white]">
              <Search />
              <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
              <input onChange={handleChangeValue} defaultValue={searchValue} type="search" id="default-search" className="text-sm bg-primary0 placeholder-[white]" placeholder="Search Projects" required />
            </div>
            <button type="submit" className="px-1 py-0.5 rounded font-bold text-sm border-2 text-[white]">Search</button>
          </div>
        </form>
      </div>

      <div className="flex space-x-2 justify-center flex-wrap gap-5 pb-5 rounded">
        {technosList.map((techno) => (
          <button className="py-2 px-4 rounded-full" style={{ backgroundColor: `#${techno.color}` }} type="button" key={techno.id}>{techno.label}</button>
        ))}
      </div>
      <div className="flex flex-col mb-10 mr-4 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10">
        {projetSearched.map((item) => (
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
