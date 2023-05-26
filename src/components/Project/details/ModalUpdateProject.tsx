import { XCircle } from "react-feather"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { useState } from "react";
import { updateProject } from "../../../store/reducers/projects";
import { Project } from "../../../@types/project";
import AddTechno from "../../Modals/AddTechno";
import { emptySelectedTechnos, getAllTechnos } from "../../../store/reducers/techno";

interface updateProjectProps {
  project: Project ,
  closeModal: () => void
}

export default function ModalUpdateContent({ closeModal, project }: updateProjectProps) {
  // state des technos
  const technoList = useAppSelector((state) => state.techno.technoLists);
  // state des modals
  const [showModalAddTechno, setShowModalAddTechno] = useState(false);
  // state des technos sélectionnées
  const technoSelected = useAppSelector((state) => state.techno.selectedTechnos);
  // state des champs de saisie
  const [updateTitle, setUpdateTitle] = useState('')
  const [updateContent, setUpdateContent] = useState('')
  const [updateStatus, setUpdateStatus] = useState('')
  const dispatch = useAppDispatch()
  // Mettre à jour un projet
  const handleUpdateUserSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(getAllTechnos())
    // Je récupère les id des technos sélectionnées en fonction des labels
    const idTechnoSelected = technoSelected.map((techno) => {
      const technoFind = technoList.find((technoList) => technoList.label === techno.label);
      return technoFind?.id as number;
    })
    const data = {
      id: project.id,
      title: updateTitle || project.title,
      content: updateContent || project.content,
      status: updateStatus || project.status,
      // si technoSelected est vide, on ne l'envoi pas au reducer
      technoProjet: idTechnoSelected as number[]
    }
    // action vers le reducer avec les données du formulaire
    dispatch(updateProject(data))
    dispatch(emptySelectedTechnos())
    closeModal()
  }

  const technoTemporaly = [...project.technoProjet, ...technoSelected].filter((techno, index, self) =>  
    index === self.findIndex((t) => (
      t.label === techno.label
    ))
  )

  return (
    <div className="rounded w-[80%] mx-auto pb-5 relative mt-2 pt-8 sm:pt-2">
      <button
        onClick={closeModal}
        className="absolute top-3 right-2 "
      >{<XCircle />}
      </button>
      {showModalAddTechno ? (
        <AddTechno
          technoPred={project.technoProjet}
          closeModal={() => setShowModalAddTechno(false)} />
      ) : (
        <div className="pt-2 sm:mt-[2rem] rounded w-full mx-auto">
          <div className="w-full rounded-lg bg-white lg:mx-0 border-2 border-solid border-secondary10">
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
                      <input onChange={(e) => setUpdateTitle(e.currentTarget.value)} defaultValue={project.title} type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="Titre" />
                    </div>
                    <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                      <label htmlFor="lastname" className="text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Description</label>
                      <textarea rows={10} onChange={(e) => setUpdateContent(e.currentTarget.value)} defaultValue={project.content} className="shadow-sm text-sm rounded block p-2.5 w-full" placeholder="Description" />
                    </div>
                    <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                      <label htmlFor="email" className="text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Status</label>
                      <input onChange={(e) => setUpdateStatus(e.currentTarget.value)} defaultValue={project.status} type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="Status" />
                    </div>
                    <div className="flex flex-col items-center space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-5 pb-5 rounded">
                      <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold">Techno</div>
                      <button onClick={() => setShowModalAddTechno(true)} className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Gérer les technos</button>
                      <div className="flex flex-wrap gap-2 justify-center items-center">
                        {technoTemporaly.map((techno) => (
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
      )}

    </div>

  )
}