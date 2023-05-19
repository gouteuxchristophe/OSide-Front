import { XCircle } from "react-feather"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { updateProject } from "../../../store/reducers/projects";
import findProject from '../../../store/selectors/project';

interface CheckboxData {
  id: number;
  label: string;
}

export default function ModalUpdateProject({ closeModal }: { closeModal: () => void }) {

  // On récupère l'id du projet recherché
  const { id } = useParams();
  // On utilise la fonction findProject qui permet de trouver un projet correspondant à l'id passé
  // en paramètre et on lui envoi avec le state pour recherche
  const project = useAppSelector((state) => findProject(state.projects.lists, Number(id)));
  const technosList = useAppSelector((state) => state.search.technoLists);
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')
  const [updateTechno, setUpdateTechno] = useState<number[]>([])
  const dispatch = useAppDispatch()
  

  const handleUpdateUserSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  
    const data = {
      id: project?.id,
      title: project?.title,
      content: project?.content,
    }
    // action vers le reducer avec les données du formulaire
    dispatch(updateProject(data))
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
          <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
            <label htmlFor="firstname" className="w-[90%] text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Title</label>
            <input onChange={(e) => setUpdateTitle(e.currentTarget.value)} defaultValue={project?.title} type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="prénom" />
          </div>
          <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
            <label htmlFor="lastname" className="text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Content</label>
            <textarea onChange={(e) => setUpdateContent(e.currentTarget.value)} defaultValue={project?.content} className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="nom" />
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