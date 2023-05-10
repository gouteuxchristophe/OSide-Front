import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu as Burger, XCircle } from 'react-feather';

function Menu() {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const handleToogleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="block sm:hidden">
        <button
          type="button"
          onClick={handleToogleMenu}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        />
        <div className={`${displayMenu ? 'hidden' : 'block'}`}>
          <Burger />
        </div>
      </div>
      <div
        className={`w-full block flex-grow sm:flex sm:items-center sm:w-auto ${displayMenu ? 'block' : 'hidden'}`}
      >
        <div className="text-sm flex flex-col items-center justify-around absolute left-0 top-0 w-full bg-primary0 h-[100vh] sm:relative sm:h-[10vh] sm:flex-row  ">
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
            Liste des Projets
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
      </div>
    </nav>
  );
}

export default Menu;
