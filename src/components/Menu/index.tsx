import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu as Burger, XCircle, User, Home,
} from 'react-feather';
import { useAppSelector } from '../../hooks/redux';
import ModalUser from './ModalUser';

function Menu() {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const isLogged = useAppSelector((state) => state.login.logged);
  const avatar = useAppSelector((state) => state.user.avatar);
  const userName = useAppSelector((state) => state.user.github_login);
  const [showModal, setShowModal] = useState(false);

  const handleToogleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div>
        {showModal && (
          <ModalUser handleCloseModal={closeModal} />
        )}
      </div>
      <nav className="flex items-center justify-between p-2 gap-2">
        <div className="block sm:hidden">
          <div className={`${displayMenu ? 'hidden' : 'block'}`}>
            <Burger onClick={handleToogleMenu} />
          </div>
        </div>
        <div
          className={`w-full block flex-grow sm:flex sm:items-center sm:w-auto ${displayMenu ? 'block' : 'hidden'}`}
        >
          <div className="h-full text-sm flex flex-wrap gap-3 items-center justify-center absolute left-0 top-0 w-full sm:pb-0 sm:relative sm:flex-row bg-primary0 sm:bg-secondary20 sm:flex-wrap">
            <Link
              to="/"
              onClick={handleToogleMenu}
              className="block sm:inline-block sm:mt-0 text-white-200 border border-solid border-[white] rounded p-2 bg-secondary20 sm:bg-primary0 tracking-wider"
            >
              <Home />
            </Link>
            <Link
              to="/projects"
              onClick={handleToogleMenu}
              className="block sm:inline-block sm:mt-0 text-white-200 border border-solid border-[white] rounded p-2 bg-secondary20 sm:bg-primary0 tracking-wider"
            >
              Projets
            </Link>
            <Link
              to="/about"
              onClick={handleToogleMenu}
              className="block sm:inline-block sm:mt-0 text-white-200 border border-solid border-[white] rounded p-2 bg-secondary20 sm:bg-primary0 tracking-wider"
            >
              About
            </Link>
            <Link
              to="/search"
              onClick={handleToogleMenu}
              className="block sm:inline-block sm:mt-0 text-white-200 border border-solid border-[white] rounded p-2 bg-secondary20 sm:bg-primary0 tracking-wider"
            >
              Rechercher
            </Link>
            <div className="sm:hidden">
              <XCircle onClick={handleToogleMenu} />
            </div>
          </div>
        </div>
        {isLogged ? (
          <button type="button" onClick={() => setShowModal(true)}>
            <img src={avatar} className="rounded-full mx-auto h-12 w-12 bg-cover bg-center" alt={userName} />
            {' '}
          </button>
        ) : (
          <Link
            to="/login"
            className="border border-solid border-[white] rounded-full p-1 bg-[white]"
          >
            <User />
          </Link>
        )}
      </nav>
    </>
  );
}

export default Menu;
