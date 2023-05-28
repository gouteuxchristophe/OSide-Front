import { useState } from "react";
import DeleteConfirmation from "../Admin/deleteConfirmation";
import { useAppSelector } from "../../hooks/redux";

function ModalDeleteUser({ closeModal }: { closeModal: () => void }) {

  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const userId = useAppSelector((state) => state.user.data.id);

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0"
      ></div>
      <div className="fixed z-10 top-1/3 left-1/2 -translate-x-1/2 bg-primary0 rounded w-[50%]">
        <div className="w-full p-8 flex flex-col items-center gap-2">
          <h2 className="text-center">⚠️ Vous vous apprêtez à supprimer votre compte !</h2>
          <p className="text-center">Toutes vos informations seront conservés pendant un an avant suppression de nos serveurs. Si vous souhaitez conservez votre compte, il suffit de vous connecter. Êtes-vous sûr de vouloir continuer ?</p>
          <button onClick={() => setShowModalConfirmation(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-[red] rounded-lg focus:ring-4 focus:outline-none">Confirmer</button>
        </div>
        <button
          className="absolute top-1 right-1 w-7 h-7 bg-[white] rounded flex justify-center items-center"
          onClick={closeModal}
        >
          X
        </button>
      </div>
      {showModalConfirmation && (
        <DeleteConfirmation
          type="user"
          id={userId}
          closeModal={() => setShowModalConfirmation(false)} />
      )}
    </>
  );
}

export default ModalDeleteUser;