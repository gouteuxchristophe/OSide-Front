import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  getAllUsers,
  resetSuccessDelete
} from "../../store/reducers/user";
import { Edit3, Eye, Trash2 } from "react-feather";
import ModalUpdateRole from "./ModalUpdateUser";
import DeleteConfirmation from "./deleteConfirmation";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserDataFromLocalStorage } from "../../utils/login";


function Admin_Users() {

  //  Permet de savoir si l'utilisateur est connecté et son rôle
  const isLogged = useAppSelector(state => state.login.logged)
  const sessionStorage = getUserDataFromLocalStorage()
  const role = sessionStorage?.role
  // Permet de récupérer la liste des utilisateurs
  const allUser = useAppSelector((state) => state.user.allUsers);
  // state des modals
  const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
  // state des utilisateurs
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [selectedRole, setSelectedRole] = useState<number>(0);
  // state des messages de succès ou d'erreur
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const successDelete = useAppSelector((state) => state.user.successDelete);
  const successUpdate = useAppSelector((state) => state.user.successUpdate);
  // Permet le dispatch et le navigate
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion
  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }
  // Si l'utilisateur n'est pas admin, il est redirigé vers la page d'accueil
  if (role !== 3) {
    toast.warn('🦄 Vous n\'avez pas accès à cette page !');
    return <Navigate to="/" replace />
  }
  // Récupérer la liste des utilisateurs
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  
  // Permet d'afficher la modal de suppression d'un utilisateur
  const handleDeleteUser = () => {
    setDeleteConfirmation(true);
  }
  // Affiche une notification de succès si la suppression ou la modification d'un utilisateur a réussi
  useEffect(() => {
    if (successDelete) {
      dispatch(getAllUsers());
      dispatch(resetSuccessDelete())
      toast.success(`🦄 ${successDelete}`);
    }
    if (successUpdate) {
      dispatch(getAllUsers());
      toast.success(`🦄 ${successUpdate}`);
      dispatch(resetSuccessDelete())
    }
  }, [successDelete, successUpdate])

  return (
    <div className="relative mx-auto">
      <table className="text-xs text-center mx-auto w-[80%] sm:w-[40%]">
        <thead className="text-xs uppercase bg-secondary20">
          <tr>
            <th scope="col" className="px-2 py-2">
              GitHub Login
            </th>
            <th scope="col" className="px-2 py-2">
              Rôle
            </th>
            <th scope="col" className="px-2 py-2">
              Statut
            </th>
            <th scope="col" className="px-2 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user) => (
            <tr key={user.id} className="bg-[white] border-solid border-b border-primary0">
              <>
                <th scope="row" className="align-middle font-medium whitespace-nowrap relative">
                  <div className="flex items-center justify-around">
                    {user.github.login}
                  </div>
                </th>
                <td className="whitespace-nowrap align-middle">
                  <div className="rounded">
                    {user.role.label}
                  </div>
                </td>
                <td className=" align-middle flex-wrap">
                  {user.delete_at === null ? (
                    <div className="rounded bg-green-500 text-white px-2 py-1">
                      Inscrit depuis le : {
                        new Date(user.created_at as string).toLocaleDateString('fr')}
                    </div>
                  ) : (
                    <div className="rounded bg-red-500 text-white px-2 py-1">
                      Inactif depuis le : {
                        new Date(user.delete_at as string).toLocaleDateString('fr')}
                    </div>
                  )}
                </td>
                <td className="flex justify-around">
                  <button onClick={() => navigate(`/profile/${user.id}`)}>
                    <Eye className="w-4" />
                  </button>
                  {/* V2 */}
                  <button disabled onClick={
                    () => {
                      setSelectedUserId(user.id);
                      setSelectedRole(user.role.id);
                      setShowModalUpdateRole(true)
                    }
                  }>
                    <Edit3 className="w-4" />
                  </button>
                  <button onClick={() => {
                    setSelectedUserId(user.id);
                    handleDeleteUser()
                  }
                  } >
                    <Trash2 color="red" className="w-4" />
                  </button>
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {showModalUpdateRole && (
          <ModalUpdateRole
            userId={selectedUserId!}
            roleId={selectedRole}
            closeModal={() => setShowModalUpdateRole(false)}
          />
        )}
        {deleteConfirmation && (
          <DeleteConfirmation
            type="admin_user"
            id={selectedUserId!}
            closeModal={() => setDeleteConfirmation(false)}
          />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">Retour</button>
      </div>
    </div>
  );
}

export default Admin_Users;