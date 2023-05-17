import { XCircle } from "react-feather"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { updateUser } from "../../store/reducers/user";

interface CheckboxData {
  id: number;
  label: string;
}

export default function ModalUpdateContent({ closeModal }: { closeModal: () => void }) {
  const user = useAppSelector(state => state.user)
  const technosList = useAppSelector((state) => state.search.technoLists);
  const [updateUsername, setUpdateUsername] = useState('')
  const [updateFirstName, setUpdateFirstName] = useState('')
  const [updateLastName, setUpdateLastName] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [updateTechno, setUpdateTechno] = useState<number[]>([])
  const dispatch = useAppDispatch()
  

  const handleUpdateUserSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Vérification des champs du formulaire
    if (updateUsername === '' || updateEmail === '') {
      setUpdateUsername(user.username)
      setUpdateEmail(user.email)
    }
    const data = {
      id: user.id,
      username: updateUsername,
      first_name: updateFirstName,
      last_name: updateLastName,
      email: updateEmail,
      ability: updateTechno
    }
    // action vers le reducer avec les données du formulaire
    dispatch(updateUser(data))
  }

  // Permet d'afficher une notification d'erreur lors de l'update'
  const displayErrorNotification = (value: string) => {
    toast.error(`🦄 ${value}`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="rounded w-[100%] mx-auto pb-5 relative">
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 p-2.5 cursor-pointer"
      >{<XCircle />}
      </div>
      <div className="px-10 pt-2 sm:mt-[2rem] rounded">
        <form onSubmit={handleUpdateUserSubmit} className="flex flex-col items-center bg-primary0 p-5 rounded">
          <h2 className="text-center pb-2">Modications de vos informations</h2>
          <div className="mb-2 sm:mb-6 flex flex-col sm:flex-row items-center justify-center sm:gap-5 w-full">
            <label htmlFor="firstname" className="text-center sm:text-left block text-sm font-medium sm:w-[10%] sm:pb-0 pb-2">Prénom :</label>
            <input onChange={(e) => setUpdateFirstName(e.currentTarget.value)} defaultValue={user.first_name} type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="prénom" />
          </div>
          <div className="mb-2 sm:mb-6 flex flex-col sm:flex-row items-center justify-center sm:gap-5 w-full">
            <label htmlFor="lastname" className="text-center sm:text-left block text-sm font-medium sm:w-[10%] sm:pb-0 pb-2">Nom :</label>
            <input onChange={(e) => setUpdateLastName(e.currentTarget.value)} defaultValue={user.last_name} type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="nom" />
          </div>
          <div className="mb-2 sm:mb-6 sm:flex sm:items-center sm:justify-center sm:gap-5 sm:w-full">
            <label htmlFor="email" className="text-center sm:text-left block text-sm font-medium sm:w-[10%] sm:pb-0 pb-2">Email :</label>
            <input onChange={(e) => setUpdateEmail(e.currentTarget.value)} defaultValue={user.email} type="email" className="shadow-sm text-sm rounded block w-full p-2.5 sm:w-[40%]" placeholder="name@flowbite.com" required />
          </div>
          <button type="submit" className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Valider les modifications</button>
        </form>
        <div>
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}