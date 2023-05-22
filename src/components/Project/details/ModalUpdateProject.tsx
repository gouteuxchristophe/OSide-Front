import { XCircle, PlusSquare } from "react-feather"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { updateProject, getAllProjects } from "../../../store/reducers/projects";
import axiosInstance from '../../../utils/axios';

interface CheckboxData {
  id: number;
  label: string;
}

export default function ModalUpdateContent({ closeModal }: { closeModal: () => void }) {

  // On récupère l'id du projet recherché
  const { id } = useParams();
  const [showModalAddTechno, setShowModalAddTechno] = useState(false);
  const technoSelected = useAppSelector((state) => state.techno.selectedTechnos);
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')
  const [updateStatus, setUpdateStatus] = useState('')
  const [updateTechno, setUpdateTechno] = useState<number[]>([])

  // On utilise la fonction findProject qui permet de trouver un projet correspondant à l'id passé
  // en paramètre et on lui envoi avec le state pour recherche
  // const project = useAppSelector((state) => findProject(state.projects.lists, Number(id))); // /!\ Attention pas scalable
  const getProject = async () => {
    try {
      const response = await axiosInstance.get(`/projet/${id}`) as any;
      console.log('response', response)
      if (response) {
        setUpdateTitle(response?.data.title)
        setUpdateContent(response?.data.content)
        setUpdateStatus(response?.data.status)
        setUpdateTechno(response?.data.techno)
      }
    } catch (e) {
      throw e
    }
  }
  useEffect(() => {
    getProject();
  }, []);
  const dispatch = useAppDispatch()


  const handleUpdateUserSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const data = {
      id: id as string,
      title: updateTitle,
      content: updateContent,
      status: updateStatus,
      technoProjet: updateTechno,
    }
    // action vers le reducer avec les données du formulaire
    dispatch(updateProject(data))
    // On ferme la modal
    closeModal()
    // On affiche une notification de succès
    toast.success('Votre projet a bien été modifié')
  }

  // Permet d'afficher une notification d'erreur lors de l'update'
  const displayErrorNotification = (value: string) => {
    toast.error(`🦄 ${value}`);
  };

  return (
    <div className="rounded w-[100%] mx-auto pb-5 relative">
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 p-2.5 cursor-pointer"
      >{<XCircle />}
      </div>
      <div className="px-10 pt-2 sm:mt-[2rem] rounded w-full">
        <div className="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 mx-6 lg:mx-0 border-2 border-solid border-secondary10">
          <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">

            <div className="pb-5 border-b-2 border-solid border-secondary23 rounded">
              <h2 className="text-center pb-2">Modications des informations de votre projet</h2>
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-2xl font-bold lg:pt-0 text-left"></h1>
              </div>
              <div>
                <form onSubmit={handleUpdateUserSubmit} className="flex flex-col gap-5">
                  <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                    <label htmlFor="firstname" className="w-[90%] text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Titre</label>
                    <input onChange={(e) => setUpdateTitle(e.currentTarget.value)} value={updateTitle} type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="Titre" />
                  </div>
                  <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                    <label htmlFor="lastname" className="text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Description</label>
                    <textarea onChange={(e) => setUpdateContent(e.currentTarget.value)} value={updateContent} className="shadow-sm text-sm rounded block p-2.5 w-full" placeholder="Description" />
                  </div>
                  <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                    <label htmlFor="email" className="text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Status</label>
                    <input onChange={(e) => setUpdateStatus(e.currentTarget.value)} value={updateStatus} type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="Status" />
                  </div>
                  <div className="flex flex-col items-center space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-5 pb-5 rounded">
                    <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold">Techno</div>
                    <button onClick={() => setShowModalAddTechno(true)} className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Ajouter une techno</button>
                    <div className="flex flex-wrap gap-2 justify-center items-center">
                      {technoSelected.map((techno) => (
                        <div className="relative" key={`${techno.id}-${techno.label}`}>
                          <span className={`p-2 bg-[white] rounded border border-solid border-${techno.color}`}>{techno.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                    <button type="submit" className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Valider les modifications</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="pt-12 pb-8 flex justify-around flex-wrap gap-2 text-[white]">
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}