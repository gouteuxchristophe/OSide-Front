import { useAppDispatch } from "../../hooks/redux";
import { deleteTechno } from "../../store/reducers/techno";

interface ModalDeleteTechnoProps {
  closeModal: () => void;
  id: number;
}

function DeleteConfirmation({ id, closeModal }: ModalDeleteTechnoProps) {

  const dispatch = useAppDispatch();
  const handleConfirmationDeleted = () => {
    dispatch(deleteTechno(id));
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