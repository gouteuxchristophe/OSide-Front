import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deleteMessageAdd, deleteRole, deleteRoleErrorMessage, getAllRole } from "../../store/reducers/role";
import { Edit3, PlusSquare, Trash2 } from "react-feather";
import ModalUpdateRole from "./ModalUpdateRole";
import { toast } from "react-toastify";
import { deleteMessage, deleteMessageUpdate } from "../../store/reducers/role";
import ModalAddRole from "./ModalAddRole";
import DeleteConfirmation from "./deleteConfirmation";
import { Navigate, useNavigate } from "react-router-dom";

function Admin_Roles() {

  const rolesList = useAppSelector((state) => state.role.lists);
  // state des modals
  const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
  const [showModalAddRole, setShowModalAddRole] = useState(false);
  // state des roles
  const [selectedRoleId, setSelectedRoleId] = useState<number>();
  const [selectedRoleLabel, setSelectedRoleLabel] = useState<string>();
  const [selectedRoleColor, setSelectedRoleColor] = useState<string>();
  // state des messages de succès ou d'erreur
  const successDelete = useAppSelector((state) => state.role.successDelete);
  const successUpdate = useAppSelector((state) => state.role.successUpdate);
  const successAdd = useAppSelector((state) => state.role.successAdd);
  const errorAPIRole = useAppSelector((state) => state.role.errorAPIRole);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const isLogged = useAppSelector(state => state.login.logged)
  const role = useAppSelector((state) => state.user.data.role);

  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }

  if (role.id !== 3) {
    toast.warn('🦄 Vous n\'avez pas accès à cette page !');
    return <Navigate to="/home" replace />
  }


  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Récupérer la liste des roles
  useEffect(() => {
    dispatch(getAllRole())
  }, [dispatch]);

  // Permet d'afficher une notification si le role a bien été supprimée, modifiée, ajoutée
  // et de recharger la liste des roles
  useEffect(() => {
    if (errorAPIRole) {
      toast.error(`🦄 ${errorAPIRole}`);
      dispatch(deleteRoleErrorMessage())
      return
    }
    if (successDelete) {
      toast.success(`🦄 ${successDelete}`);
      dispatch(deleteMessage());
    }
    if (successUpdate) {
      toast.success(`🦄 ${successUpdate}`);
      dispatch(deleteMessageUpdate());
    }
    if (successAdd) {
      toast.success(`🦄 ${successAdd}`);
      dispatch(deleteMessageAdd());
      dispatch(deleteMessageAdd());
    }
    dispatch(getAllRole());
  }, [successDelete, successUpdate, successAdd, errorAPIRole]);

  // Permet d'afficher la modal de suppression d'un role
  const handleDeleteRole = () => {
    setDeleteConfirmation(true);
  }

  return (
    <div className="w-full relative mx-auto">
      <div className="flex justify-center mb-5">
        <button onClick={() => setShowModalAddRole(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none"><PlusSquare /> Ajouter un rôle</button>
      </div>
      <table className="text-xs text-center mx-auto w-[80%] sm:w-[40%]">
        <thead className="text-xs uppercase bg-secondary20">
          <tr>
            <th scope="col" className="px-2 py-2">
              Technologie
            </th>
            <th scope="col" className="px-2 py-2">
              Couleur
            </th>
            <th scope="col" className="px-2 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rolesList.map((role) => (
            <tr key={role.id} className="bg-[white] border-solid border-b border-primary0">
              <>
                <th scope="row" className="align-middle font-medium whitespace-nowrap relative">
                  <div className="flex items-center justify-around">
                    {role.label}
                  </div>
                </th>
                <td className="whitespace-nowrap align-middle">
                  <div className="rounded" style={{ backgroundColor: `${role.color}` }}>
                    {role.color}
                  </div>
                </td>
                <td className="flex justify-around">
                  <button onClick={() => {
                    setSelectedRoleId(role.id);
                    setSelectedRoleLabel(role.label);
                    setSelectedRoleColor(role.color);
                    setShowModalUpdateRole(true);
                  }}>
                    <Edit3 className="w-4" />
                  </button>
                  <button onClick={() => {
                    setSelectedRoleId(role.id);
                    handleDeleteRole()
                  }}>
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
            id={selectedRoleId!}
            label={selectedRoleLabel!}
            color={selectedRoleColor!}
            closeModal={() => setShowModalUpdateRole(false)}
          />
        )}
        {deleteConfirmation && (
          <DeleteConfirmation
            id={selectedRoleId!}
            type="role"
            closeModal={() => setDeleteConfirmation(false)}
          />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">Retour</button>
      </div>
      {showModalAddRole && (
        <ModalAddRole closeModal={() => setShowModalAddRole(false)} />
      )}
    </div>
  );
}

export default Admin_Roles;