import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import AddTechno from "../../Modals/AddTechno";
import { useEffect, useState } from "react";
import { changeCredentialsContent, changeCredentialsTitle, createProject, deleteMessageAdd, deleteProjectErrorMessage, newProject } from "../../../store/reducers/projects";
import { emptySelectedTechnos, getAllTechnos } from "../../../store/reducers/techno";

function AddProjects() {
  // permet de vérifier si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.login.logged);
  // permet de récupérer les données de l'utilisateur
  const user = useAppSelector((state) => state.user.data);
  // state du modal
  const [showModalAddTechno, setShowModalAddTechno] = useState(false);
  // state du formulaire
  const credentialTitle = useAppSelector((state) => state.projects.credentialTitle);
  const credentialContent = useAppSelector((state) => state.projects.credentialContent);
  // state des messages de succès
  const successAdd = useAppSelector((state) => state.projects.successAdd);
  const errorAdd = useAppSelector((state) => state.projects.errorApiProjects);
  // state du nouvel id du projet
  const idNewProject = useAppSelector((state) => state.projects.idNewProject);
  // state des technos sélectionnées
  const technoSelected = useAppSelector((state) => state.techno.selectedTechnos);
  // state des technos
  const technoList = useAppSelector((state) => state.techno.technoLists);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Récupérer la liste des technos
  useEffect(() => {
    dispatch(getAllTechnos());
  }, [technoSelected]);

  // Redirige l'utilisateur vers la page d'accueil si il n'est pas connecté
  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }
  // Afficher un toast si le projet a bien été ajouté
  useEffect(() => {
    if (successAdd) {
      toast.success(`🦄 ${successAdd}`);
      dispatch(emptySelectedTechnos())
      dispatch(deleteMessageAdd())
      navigate(`/project/${idNewProject}`);
    }
    if (errorAdd) {
      toast.error(`🦄 ${errorAdd}`);
      dispatch(deleteProjectErrorMessage())
    }
  }, [successAdd, errorAdd]);

  // Permet d'ajouter un projet
  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Je compare la liste technoSelected avec la technoList pour récupérer les id des technos sélectionnées en fonction des labels
    const idTechnos = technoSelected.map((techno) => {
      const technoFind = technoList.find((technoList) => technoList.label === techno.label);
      return technoFind?.id;
    })
    const newProject = {
      title: credentialTitle,
      content: credentialContent,
      status: 'Ouvert à la participation',
      owner_id: user.id,
      technoProjet: idTechnos
    }
    dispatch(createProject(newProject as newProject));
  }

  const handleCredentialTitle = (title: string) => {
    dispatch(changeCredentialsTitle(title));
  }

  const handleCredentialContent = (content: string) => {
    dispatch(changeCredentialsContent(content));
  }

  return (
    <>
      {showModalAddTechno ? (
        <AddTechno closeModal={() => setShowModalAddTechno(false)} />
      ) : (
        <div className="px-10 py-10 mt-[2rem] rounded w-full">
          <div className="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 mx-6 lg:mx-0 border-2 border-solid border-secondary10">
            <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
              <div className="block rounded-full shadow-xl mx-auto -mt-16 md:-mt-24 h-24 w-24 bg-cover bg-center border-b-4 border-solid border-secondary10" style={{ backgroundImage: `url(${user.avatar_url})` }} />
              <div className="pb-5 border-b-2 border-solid border-secondary23 rounded">
                <h2>Ajout d'un projet</h2>
                <div className="flex items-center justify-between mb-3">
                  <h1 className="text-2xl font-bold lg:pt-0 text-left"></h1>
                </div>
                <div>
                  <form onSubmit={handleAddProject} className="flex flex-col gap-5">
                    <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                      <label htmlFor="title" className="w-[90%] text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Title</label>
                      <input onChange={(e) => handleCredentialTitle(e.currentTarget.value)} defaultValue={credentialTitle} type="text" name="" id="" />
                    </div>
                    <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                      <label htmlFor="content" className="text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Content</label>
                      <textarea rows={10} onChange={(e) => handleCredentialContent(e.currentTarget.value)} defaultValue={credentialContent} className="w-full" />
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
                    <div>
                      <button className="bg-primary0 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center" type="submit">Envoyer</button>
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
    </>

  );
}

export default AddProjects;