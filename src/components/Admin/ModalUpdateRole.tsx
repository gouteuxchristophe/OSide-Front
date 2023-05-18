import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { updateRole } from "../../store/reducers/role";

interface ModalUpdateRoleProps {
  closeModal: () => void;
  id: number;
  label: string;
  color: string;
}

function ModalUpdateRole({ closeModal, id, label, color }: ModalUpdateRoleProps) {

  const dispatch = useAppDispatch();
  const [inputlabel, setInputLabel] = useState<string>(label);
  const [inputColor, setInputColor] = useState<string>(color);


  function handleUpdateRoleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = {
      id: id,
      label: inputlabel,
      color: inputColor,
    }
    dispatch(updateRole(data));
    closeModal();
  }

  return (
    <>
      <div className="absolute z-10 top-1 left-1/2 -translate-x-1/2 bg-primary0 rounded w-[70%] sm:w-[20%] lg:w-[10%] shadow-xl">
        <div className="w-full p-8 flex flex-col gap-3 text-[white]">
          <h2 className="text-center">Modification du rôle</h2>
          <form onSubmit={handleUpdateRoleSubmit} className="flex flex-col gap-5">
            <div className="flex justify-around">
              <label htmlFor="Label">Label</label>
              <input className="w-[30%] text-[black]" onChange={(e) => setInputLabel(e.currentTarget.value)} type="text" defaultValue={label} />
            </div>
            <div className="flex justify-around">
              <label htmlFor="Color">Color</label>
              <input onChange={(e) => setInputColor(e.currentTarget.value)} type="color" defaultValue={color} />
            </div>
            <button className="py-2 px-4 rounded-full bg-secondary20 border-2 border-solid">Modifier</button>
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

export default ModalUpdateRole;