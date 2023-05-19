import { XCircle, PlusSquare } from "react-feather"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import { ToastContainer, toast } from "react-toastify";
import { updateProject } from "../../../store/reducers/projects";
import findProject from '../../../store/selectors/project';
import AddTechno from "../../Modals/AddTechno";

interface CheckboxData {
  id: number;
  label: string;
}

interface UpdatedProject {
  title: string;
  content: string;
  status: string;
  technoProjet: [];
  owner_id: number
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
  const [showTechnoModal, setShowTechnoModal] = useState(false)
  const dispatch = useAppDispatch()
  
  const currentProject = useAppSelector((state) => state.projects.projectByID)
  console.log(currentProject)
  const technosSelected = useAppSelector((state) => state.techno.selectedTechnos)
  console.log(technosSelected)
  const technosInProject = currentProject.technoProjet
  console.log(technosInProject)

  const handleUpdateUserSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  
    const data = {
      id: id,
      title: updateTitle,
      content: updateContent,

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
          <div><ul className="flex flex-row">{technosSelected.map(techno => (
            <li key={techno.id} className="m-2 p-1 rounded-md bg-[white] border-solid" style={{ borderColor: `${techno.color}` }}>{techno.label}</li>
          ) ) }</ul></div>
          <div className="flex flex-row bg-[white]">
          <button className="flex flex-row" type="button" onClick={() => setShowTechnoModal(true)}><PlusSquare />Add technos</button>
          </div>
          <button type="submit" className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Valider les modifications</button>
        </form>
        <div>
          <ToastContainer />
        </div>
      </div>
      { showTechnoModal && (<div className="absolute bottom-8 right-12"><AddTechno closeModal={() => setShowTechnoModal(false)} /></div>)}
    </div>

  )
}