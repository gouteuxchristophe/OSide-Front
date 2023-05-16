function ModalDeleteUser({ closeModal }: { closeModal: () => void }) {
  return (
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0"
      ></div>
      <div className="fixed z-10 top-1/3 left-1/2 -translate-x-1/2 bg-primary0 rounded w-[50%]">
        <div className="w-full p-8">
          <h2 className="text-center">⚠️ Vous vous apprêtez à supprimer votre compte !</h2>
        </div>
        <button
          className="absolute top-1 right-1 w-7 h-7 bg-[white] rounded flex justify-center items-center"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </>
  );
}

export default ModalDeleteUser;