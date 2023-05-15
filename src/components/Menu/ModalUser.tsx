import {
  XCircle,
} from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/login';
import { useAppDispatch } from '../../hooks/redux';
import { toast } from 'react-toastify';

interface ModalUserProps {
  handleCloseModal: () => void;
}

function ModalUser({ handleCloseModal }: ModalUserProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Permet de se déconnecter
  const handleLogout = () => {
    dispatch(logout());
    handleCloseModal();
    navigate("/");
  };
  // Permet d'afficher une notification lors de la déconnexion
  const displayLogoutNotification = () => {
    handleLogout()
    handleCloseModal();
    toast.success('🦄 Logout success !', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
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
          onClick={displayLogoutNotification}
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
