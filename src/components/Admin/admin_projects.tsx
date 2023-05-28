import { useEffect, useState } from "react";
import { deleteMessageUpdate, deleteMessageAdd, getAllProjects, deleteMessageDelete } from "../../store/reducers/projects";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Edit3, Eye, Trash2 } from "react-feather";
import DeleteConfirmation from "./deleteConfirmation";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import ModalUpdateProject from "../Project/details/ModalUpdateProject";
import { Project } from "../../@types/project";
import { getUserDataFromLocalStorage } from "../../utils/login";

function Admin_Projects() {

  // Permet de récupérer la liste des projets
  const projectsList = useAppSelector((state) => state.projects.lists);
  // state du projet sélectionné pour la modification
  const [projetItem, setProjetItem] = useState<Project>();
  // state du modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // state de la suppression
  const [selectedProjectId, setSelectedProjectId] = useState<number>();
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  // state des messages de succès
  const successDelete = useAppSelector((state) => state.projects.successDelete);
  const successUpdate = useAppSelector((state) => state.projects.successUpdate);
  const successAdd = useAppSelector((state) => state.projects.successAdd);
  const isLogged = useAppSelector(state => state.login.logged)
  const sessionStorage = getUserDataFromLocalStorage()
  const role = sessionStorage?.role
  
  // Permet le dispatch et le navigate
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
   // Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion
   if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }
  // Si l'utilisateur n'est pas admin, il est redirigé vers la page d'accueil
  if (role !== 3) {
    toast.warn('🦄 Vous n\'avez pas accès à cette page !');
    return <Navigate to="/home" replace />
  }


  // Récupérer la liste des projets
  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])

  // Permet d'afficher la modal de suppression d'un projet
  const handleDeleteProject = () => {
    setDeleteConfirmation(true);
  }
  
  // Permet d'afficher une notification si le projet a bien été supprimée, modifié, ajouté
  // et de recharger la liste des projets
  useEffect(() => {
    if (successDelete) {
      toast.success(`🦄 ${successDelete}`);
      dispatch(deleteMessageDelete());
    }
    if (successUpdate) {
      toast.success(`🦄 ${successUpdate}`);
      dispatch(deleteMessageUpdate());
    }
    if (successAdd) {
      toast.success(`🦄 ${successAdd}`);
      dispatch(deleteMessageAdd());
    }
    dispatch(getAllProjects());
  }, [successDelete, successUpdate, successAdd]);

  return (
    <>
      {!showUpdateModal ? (
        <div className="mx-auto mt-5 w-full">
          <table className="text-xs text-center mx-auto w-[60%] sm:w-[50%]">
            <thead className="text-xs uppercase bg-secondary20">
              <tr>
                <th scope="col" className="px-2 py-2">
                  Technologie
                </th>
                <th scope="col" className="px-2 py-2">
                  Couleur
                </th>
                <th scope="col" className="px-2 py-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projectsList.map((project) => (
                <tr key={project.id} className="bg-[white] border-solid border-b border-primary0">
                  <>
                    <th scope="row" className="align-middle font-medium whitespace-nowrap relative">
                      <div className="flex items-center justify-around">
                        {project.title}
                      </div>
                    </th>
                    <td className="align-middle">
                      <div className="rounded">
                        {project.status}
                      </div>
                    </td>
                    <td className="flex justify-around">
                      <button onClick={() => navigate(`/project/${project.id}`)}>
                        <Eye className="w-4" />
                      </button>
                      <button onClick={() => {
                        setShowUpdateModal(true);
                        setProjetItem(project as Project)
                      }}>
                        <Edit3 className="w-4" />
                      </button>
                      <button onClick={() => {
                        setSelectedProjectId(project.id);
                        handleDeleteProject()
                      }}>
                        <Trash2 color="red" className="w-4" />
                      </button>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {deleteConfirmation && (
              <DeleteConfirmation
                type="projects"
                id={selectedProjectId!}
                closeModal={() => setDeleteConfirmation(false)}
              />
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">Retour</button>
          </div>
        </div>
      ) : (
        <div>
          {showUpdateModal && (
            <ModalUpdateProject
              project={projetItem!}
              closeModal={() => setShowUpdateModal(false)} />
          )}
        </div>
      )}

    </>
  );
}

export default Admin_Projects;