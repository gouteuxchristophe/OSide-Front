// eslint-disable-next-line import/no-extraneous-dependencies
import { Search } from 'react-feather';

interface InputSearchProps {
  handleChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue: string
}
function InputSearch({ handleChangeValue, defaultValue }: InputSearchProps) {
  return (
    <form className="w-full bg-primary0 px-2 py-3 rounded-xl opacity-75 m-1 ">
      <div className="flex justify-between">
        <div className="flex gap-2 text-[white] w-full">
          <Search />
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
          <input onChange={handleChangeValue} defaultValue={defaultValue} type="search" id="default-search" className="text-sm bg-primary0 placeholder-[white] w-full" placeholder="Search Projects" required />
        </div>
      </div>
    </form>
  );
}

export default InputSearch;
