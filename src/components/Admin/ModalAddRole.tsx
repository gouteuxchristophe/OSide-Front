import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { addRole } from "../../store/reducers/role";

export interface newRole {
  label: string,
  color: string,
}

function ModalAddRole({ closeModal }: { closeModal: () => void } ) {

  const dispatch = useAppDispatch();
  const [inputlabel, setInputLabel] = useState<string>('label');
  const [inputColor, setInputColor] = useState<string>('#808080');

  // Permet d'ajouter un role
  const handleUpdateTechnoSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = {
      label: inputlabel,
      color: inputColor,
    }
    dispatch(addRole(data as newRole));
    closeModal();
  }

  return (
    <>
      <div className="absolute z-10 top-1 left-1/2 -translate-x-1/2 bg-primary0 rounded w-[70%] sm:w-[20%] lg:w-[10%] shadow-xl">
        <div className="w-full p-8 flex flex-col gap-3 text-[white]">
          <h2 className="text-center">Ajout du rôle</h2>
          <form onSubmit={handleUpdateTechnoSubmit} className="flex flex-col gap-5">
            <div className="flex justify-around">
              <label htmlFor="Label">Label</label>
              <input className="w-[30%] text-[black]" onChange={(e) => setInputLabel(e.currentTarget.value)} type="text" defaultValue={''} required />
            </div>
            <div className="flex justify-around">
              <label htmlFor="Color">Color</label>
              <input onChange={(e) => setInputColor(e.currentTarget.value)} type="color" defaultValue={inputColor} />
            </div>
            <button className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">Ajouter</button>
          </form>
        </div>
        <button
          className="absolute top-1 right-1 w-7 h-7 rounded-full border border-solid border-[red] bg-[red] text-[white]"
          onClick={closeModal}
        >
          X
        </button>
      </div>
    </>
  );
}

export default ModalAddRole;