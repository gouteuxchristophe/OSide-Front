import { Search } from 'react-feather';

function SearchProject() {
  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex justify-center border-b-4 border-solid border-secondary20 w-[90%] mx-auto rounded-full">
        <form className="w-full rounded bg-primary0 px-2 py-3">
          <div className="flex justify-between">
            <div className="flex gap-2 text-[white]">
              <Search />
              <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
              <input type="search" id="default-search" className="text-sm bg-primary0 placeholder-[white]" placeholder="Search Projects" required />
            </div>
            <button type="submit" className="px-1 py-0.5 rounded font-bold text-sm border-2 text-[white]">Search</button>
          </div>
        </form>
      </div>

      <div>Filtre par techno</div>
      <div>conteneur des résultats</div>
    </div>
  );
}

export default SearchProject;
