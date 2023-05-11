import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as Burger, XCircle, User } from 'react-feather';

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
        <div className="text-sm flex flex-col items-center justify-around absolute left-0 top-0 w-full sm:relative sm:flex-row  ">
          <Link
            to="/"
            onClick={handleToogleMenu}
            className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4"
          >
            Accueil
          </Link>
          <Link
            to="/projects"
            onClick={handleToogleMenu}
            className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4"
          >
            Projets
          </Link>
          <Link
            to="/search"
            onClick={handleToogleMenu}
            className="block mt-4 sm:inline-block sm:mt-0 text-white-200 mr-4"
          >
            Rechercher
          </Link>
          <div className="sm:hidden">
            <XCircle onClick={handleToogleMenu} />
          </div>
        </div>
        <div>
          <User />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
