import {
  FolderPlus, LogOut, UserCheck, XCircle,
} from 'react-feather';
import { Link } from 'react-router-dom';
import { logout } from '../../store/reducers/login';
import { useAppDispatch } from '../../hooks/redux';

interface ModalUserProps {
  handleCloseModal: () => void;
}

function ModalUser({ handleCloseModal }: ModalUserProps) {
  const dispatch = useAppDispatch();
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    dispatch(logout());
    handleCloseModal();
  };

  return (
    <div className="absolute z-10 bg-secondary20 w-full left-0 top-0 flex justify-center h-full">
      <nav className="flex items-center justify-center p-2 flex-wrap gap-2">
        <Link
          to="/dashboard"
          onClick={handleCloseModal}
          className="border border-solid border-[white] rounded p-2 bg-primary0 text-sm"
        >
          Dashboard
        </Link>
        <Link
          to="/addProject"
          onClick={handleCloseModal}
          className="border border-solid border-[white] rounded p-2 bg-primary0 text-sm"
        >
          Ajout de projet
        </Link>
        <button
          onClick={handleLogout}
          type="button"
          className="bg-primary0 p-2 border border-solid border-[white] rounded text-sm"
        >
          Déconnexion
        </button>
        <button
          onClick={handleCloseModal}
          type="button"
          className="rounded-full color-[white]"
        >
          <XCircle />
        </button>
      </nav>
    </div>

  );
}

export default ModalUser;
