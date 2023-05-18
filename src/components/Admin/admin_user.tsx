import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAllUsers } from "../../store/reducers/user";
import { Edit3, Trash2 } from "react-feather";
import ModalUpdateUser from "./ModalUpdateUser";

function Admin_Users({ closeSection }: { closeSection: (value: string) => void }) {

  const allUser = useAppSelector((state) => state.user.allUsers);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    
  }, [dispatch])

  function handleDeleteUser(id: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="relative mx-auto">
      <table className="text-xs text-center mx-auto w-[80%] sm:w-[40%]">
        <thead className="text-xs uppercase bg-secondary20">
          <tr>
            <th scope="col" className="px-2 py-2">
              GitHub Login
            </th>
            <th scope="col" className="px-2 py-2">
              Email
            </th>
            <th scope="col" className="px-2 py-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user) => (
            <tr key={user.id} className="bg-[white] border-solid border-b border-primary0">
              <>
                <th scope="row" className="align-middle font-medium whitespace-nowrap relative">
                  <div className="flex items-center justify-around">
                    {user.github.login}
                  </div>
                </th>
                <td className="whitespace-nowrap align-middle">
                  <div className="rounded">
                    {user.email}
                  </div>
                </td>
                <td className="flex justify-around">
                  <button>
                    <Edit3 className="w-4" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 color="red" className="w-4" />
                  </button>
                </td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {showModalUpdateUser && (
          <ModalUpdateUser
            closeModal={() => setShowModalUpdateUser(false)}
          />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => closeSection('users')} className="py-2 px-4 rounded-full bg-secondary20 border-2 border-solid">Retour</button>
      </div>
    </div>
  );
}

export default Admin_Users;