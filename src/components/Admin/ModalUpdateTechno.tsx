import { useState } from "react";
import { updateTechno } from "../../store/reducers/techno";

import { useAppDispatch } from "../../hooks/redux";

interface ModalUpdateTechnoProps {
  closeModal: () => void;
  id: number;
  label: string;
  color: string;
}

function ModalUpdateTechno({ closeModal, id, label, color }: ModalUpdateTechnoProps) {

  const dispatch = useAppDispatch();
  const [inputlabel, setInputLabel] = useState<string>(label);
  const [inputColor, setInputColor] = useState<string>(color);


  function handleUpdateTechnoSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = {
      id: id,
      label: inputlabel,
      color: inputColor,
    }
    dispatch(updateTechno(data));
    closeModal();
  }

  return (
    <>
      <div className="fixed z-10 top-1/3 left-1/2 -translate-x-1/2 bg-primary0 rounded w-[50%]">
        <div className="w-full p-8">
          <h2 className="text-center">Modification de la techno</h2>
          <form onSubmit={handleUpdateTechnoSubmit}>
            <div>
              <label htmlFor="Label">Label</label>
              <input onChange={(e) => setInputLabel(e.currentTarget.value)} type="text" defaultValue={label} />
            </div>
            <div>
              <label htmlFor="Color">Color</label>
              <input onChange={(e) => setInputColor(e.currentTarget.value)} type="color" defaultValue={color} />
            </div>
            <button>Modifier</button>
          </form>
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

export default ModalUpdateTechno;