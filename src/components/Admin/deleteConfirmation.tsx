import { useAppDispatch } from "../../hooks/redux";
import { deleteTechno } from "../../store/reducers/techno";
import { deleteRole } from "../../store/reducers/role";

interface ModalDeleteProps {
  closeModal: () => void;
  id: number;
  type: string;
}

function DeleteConfirmation({ id, type, closeModal }: ModalDeleteProps) {

  const dispatch = useAppDispatch();
  const handleConfirmationDeleted = () => {
    if (type === 'techno') dispatch(deleteTechno(id));
    if (type === 'role') dispatch(deleteRole(id));
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