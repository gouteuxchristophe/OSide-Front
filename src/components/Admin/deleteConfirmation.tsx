import { useAppDispatch } from "../../hooks/redux";
import { deleteTechno } from "../../store/reducers/techno";
import { deleteRole } from "../../store/reducers/role";
import { deleteProject } from "../../store/reducers/projects";
import { deleteUser } from "../../store/reducers/user";
import { useNavigate } from "react-router-dom";

interface ModalDeleteProps {
  closeModal: () => void;
  id: number;
  type: string;
}

function DeleteConfirmation({ id, type, closeModal }: ModalDeleteProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const handleConfirmationDeleted = () => {
    if (type === 'techno') dispatch(deleteTechno(id));
    if (type === 'role') dispatch(deleteRole(id));
    if (type === 'projects') dispatch(deleteProject(id));
    if (type === 'projectsUser') {
      dispatch(deleteProject(id))
      dispatch(getAllProjects)
      navigate('/dashboard')
    };
    if (type === 'users') dispatch(deleteUser(id));
    closeModal();
  }

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0"
      ></div>
      <button onClick={() => handleConfirmationDeleted()} className="fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[red] p-2 rounded text-[white]">
      ⚠️ Confirmer ⚠️
      </button>
    </>
  );
}

export default DeleteConfirmation;