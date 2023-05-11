import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu as Burger, XCircle, User, Home,
} from 'react-feather';

function Menu() {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const handleToogleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-2">
      <div className="block sm:hidden">
        <div className={`${displayMenu ? 'hidden' : 'block'}`}>
          <Burger onClick={handleToogleMenu} />
        </div>
      </div>
      <div
        className={`w-full block flex-grow sm:flex sm:items-center sm:w-auto ${displayMenu ? 'block' : 'hidden'}`}
      >
        <div className="text-sm pb-4 flex flex-col items-center justify-around absolute left-0 top-0 w-full sm:pb-0 sm:relative sm:flex-row bg-primary0 sm:bg-secondary20">
          <Link
            to="/"
            onClick={handleToogleMenu}
            className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4 border border-solid border-[white] rounded-full p-1 bg-secondary20 sm:bg-primary0"
          >
            Accueil
          </Link>
          <Link
            to="/projects"
            onClick={handleToogleMenu}
            className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4 border border-solid border-[white] rounded-full p-1 bg-secondary20 sm:bg-primary0"
          >
            Projets
          </Link>
          <Link
            to="/search"
            onClick={handleToogleMenu}
            className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4 border border-solid border-[white] rounded-full p-1 bg-secondary20 sm:bg-primary0"
          >
            Rechercher
          </Link>
          <div className="sm:hidden absolute top-2 right-2">
            <XCircle onClick={handleToogleMenu} />
          </div>
        </div>
        <div className="border border-solid border-[white] rounded-full p-1 bg-[white]">
          <User />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
