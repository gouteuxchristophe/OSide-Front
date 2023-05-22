import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toast } from 'react-toastify';

interface ModalUserProps {
  handleCloseModal: () => void;
}

function ModalUser({ handleCloseModal }: ModalUserProps) {
  // Permet de récupérer le rôle de l'utilisateur
  const role = useAppSelector((state) => state.user.data.role);
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
    toast.success('🦄 Logout success !');
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
        {(role.id === 3) && (
          <Link
          to="/admin"
          onClick={handleCloseModal}
          className="border border-solid border-[white] rounded p-2 bg-primary0 text-sm"
        >
          Admin
        </Link>
        )}
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
          className="absolute top-1 right-1 w-7 h-7 rounded-full border border-solid border-[red] bg-[red] text-[white]"
        >
          X
        </button>
      </nav>
    </div>

  );
}

export default ModalUser;
