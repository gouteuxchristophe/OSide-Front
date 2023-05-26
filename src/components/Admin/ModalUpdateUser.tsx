import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { updateUser } from "../../store/reducers/user";

interface ModalUpdateRoleProps {
  userId: number;
  roleId: number;
  closeModal: () => void;
}

function ModalUpdateRole({ closeModal, roleId, userId }: ModalUpdateRoleProps) {
  const dispatch = useAppDispatch();
  const [inputRoleId, setInputRoleId] = useState<string>('');
  // Permet de modifier un role utilisateur
  const handleUpdateRoleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = {
      id: userId,
      roleId: Number(inputRoleId)
    }
    dispatch(updateUser(data))
    closeModal();
  }

  return (
    <>
      <div className="absolute z-10 top-1 left-1/2 -translate-x-1/2 bg-primary0 rounded w-[70%] sm:w-[20%] lg:w-[10%] shadow-xl">
        <div className="w-full p-8 flex flex-col gap-3">
          <h2 className="text-center">Modification du rôle</h2>
          <form onSubmit={handleUpdateRoleSubmit} className="flex flex-col gap-5">
            <div className="flex justify-around">
              <select defaultValue={roleId} onChange={(e) => setInputRoleId(e.currentTarget.value)}>
                <option value="3">Admin</option>
                <option value="1">User</option>
                <option value="2">Modérateur</option>
              </select>
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