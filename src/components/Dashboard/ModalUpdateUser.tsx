import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddTechno from "../Modals/AddTechno";
import { resetUserErrorUpdate, resetSuccessUpdate, updateUser, getUserById } from "../../store/reducers/user";
import { emptySelectedTechnos, getAllTechnos } from "../../store/reducers/techno";


export default function ModalUpdateContent({ closeModal }: { closeModal: () => void }) {
  const user = useAppSelector(state => state.user.data)
  const [updateFirstName, setUpdateFirstName] = useState('')
  const [updateLastName, setUpdateLastName] = useState('')
  const [updateEmail, setUpdateEmail] = useState('')
  const [showModalAddTechno, setShowModalAddTechno] = useState(false)
  const [updatePassword, setUpdatePassword] = useState('')
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState('')
  const [updateBio, setUpdateBio] = useState('')
  // state des technos de l'utilisateur
  const technoSelected = useAppSelector(state => state.techno.selectedTechnos)
  // state des technos
  const technoList = useAppSelector((state) => state.techno.technoLists);
  // state des messages
  const successUpdate = useAppSelector((state) => state.user.successUpdate);
  const errorUpdate = useAppSelector((state) => state.user.errorUpdate);
// on mixe le state des ability de l'utilisateur et du technoSelected en supprimant les doublons
  const technoTemporaly = [...user.ability, ...technoSelected].filter((techno, index, self) =>  
    index === self.findIndex((t) => (
      t.label === techno.label
    ))
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllTechnos())
  }, [showModalAddTechno])
  

  useEffect(() => {
    if (successUpdate) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(getUserById())
      dispatch(resetSuccessUpdate())
      toast.success(`🦄 ${successUpdate}`);
      dispatch(emptySelectedTechnos())
      closeModal()
    }
    if (errorUpdate) {
      toast.error(errorUpdate)
      dispatch(resetUserErrorUpdate(''))
    }
  }, [successUpdate, errorUpdate]);

  // Permet de gérer la soumission du formulaire de modification de l'utilisateur
  const handleUpdateUserSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(getAllTechnos())
    // Je récupère les id des technos sélectionnées en fonction des labels
    const idTechnoSelected = technoSelected.map((techno) => {
      const technoFind = technoList.find((technoList) => technoList.label === techno.label);
      return technoFind?.id as number;
    })
    console.log(idTechnoSelected);
    
    // Si le champ password est rempli, on vérifie que les deux champs password sont identiques
    if (updatePassword !== '' && updatePassword !== updateConfirmPassword) {
      toast.error('Les mots de passe ne sont pas identiques')
      return
    }
    // Si le mot de passe ne contient pas au moins 8 caractères, une majuscule, un caractère spécial et un nombre on affiche une erreur
    if (updatePassword !== '' && !updatePassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères, une majuscule, un caractère spécial et un nombre')
      return
    }
    // Vérification des champs du formulaire
    const data = {
      id: user.id,
      ...(updateFirstName !== '' && { first_name: updateFirstName }),
      ...(updateLastName !== '' && { last_name: updateLastName }),
      ...(updatePassword !== '' && { password: updatePassword }),
      ...(updatePassword !== '' && { passwordConfirm: updateConfirmPassword }),
      ...(updateEmail !== '' && { email: updateEmail }),
      ...(idTechnoSelected.length > 0 && { ability: idTechnoSelected as number[],
      ...(updateBio !== '' && { bio: updateBio }),
      }),
    }
    // action vers le reducer avec les données du formulaire
    dispatch(updateUser(data))
  }

  return (
    <>
      {showModalAddTechno ? (
        <AddTechno
          technoPred={user.ability}
          closeModal={() => setShowModalAddTechno(false)} />
      ) : (
        <div className="rounded w-[100%] mx-auto pb-5 ">
          <div className="px-10 pt-2 sm:mt-[2rem] rounded relative">
            <form onSubmit={handleUpdateUserSubmit} className="flex flex-col items-center bg-primary0 p-5 rounded relative">
              <button
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex justify-center items-center border border-solid border-[red] bg-[red] text-[white]"
                onClick={closeModal}
              >
                X
              </button>
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
              <div className="mb-2 sm:mb-6 sm:flex sm:items-center sm:justify-center sm:gap-5 sm:w-full">
                <label htmlFor="password" className="text-center sm:text-left block text-sm font-medium sm:w-[10%] sm:pb-0 pb-2">New Password :</label>
                <input onChange={(e) => setUpdatePassword(e.currentTarget.value)} type="password" className="shadow-sm text-sm rounded block w-full p-2.5 sm:w-[40%]" placeholder="Password" />
              </div>
              <div className="mb-2 sm:mb-6 sm:flex sm:items-center sm:justify-center sm:gap-5 sm:w-full">
                <label htmlFor="confirmPassword" className="text-center sm:text-left block text-sm font-medium sm:w-[10%] sm:pb-0 pb-2">Confirmation New Password :</label>
                <input onChange={(e) => setUpdateConfirmPassword(e.currentTarget.value)} type="password" className="shadow-sm text-sm rounded block w-full p-2.5 sm:w-[40%]" placeholder="Confirmation Password" />
              </div>
              <div className="mb-2 sm:mb-6 sm:flex sm:items-center sm:justify-center sm:gap-5 sm:w-full">
                <label htmlFor="bio" className="text-center sm:text-left block text-sm font-medium sm:w-[10%] sm:pb-0 pb-2">Biographie</label>
                <textarea onChange={(e) => setUpdateBio(e.currentTarget.value)} defaultValue={user.bio} className="shadow-sm text-sm rounded block w-full p-2.5 sm:w-[40%]" placeholder="Décrivez vous" />
              </div>
              <div className="mb-2 flex-col sm:mb-6 sm:flex sm:items-center sm:justify-center sm:gap-5 sm:w-full">
                <button onClick={() => setShowModalAddTechno(true)} type="submit" className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">
                  Ajouter une techno
                </button>
                <div className="flex flex-wrap gap-2 justify-center">
                  {technoTemporaly.map((techno) => (
                    <div className="relative" key={`${techno.id}-${techno.label}`}>
                      <span className={`p-2 bg-[white] rounded border border-solid border-${techno.color}`}>{techno.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button type="submit" className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Valider les modifications</button>
            </form>
          </div>
        </div>
      )}
    </>

  )
}