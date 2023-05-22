import { useEffect, useState } from "react";
import { deleteMessageUpdate, deleteMessageAdd, deleteProject, getAllProjects } from "../../store/reducers/projects";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Edit3, Eye, Trash2 } from "react-feather";
import DeleteConfirmation from "./deleteConfirmation";
import { toast } from "react-toastify";

function Admin_Projects({ closeSection }: { closeSection: (value: string) => void }) {

  const projectsList = useAppSelector((state) => state.projects.lists);
  const [showModalUpdateProject, setShowModalUpdateProject] = useState(false);
  const successDelete = useAppSelector((state) => state.projects.successDelete);
  const successUpdate = useAppSelector((state) => state.projects.successUpdate);
  const successAdd = useAppSelector((state) => state.projects.successAdd);
  const [selectedProjectId, setSelectedProjectId] = useState<number>();
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])

  const handleDeleteProject = () => {
    setDeleteConfirmation(true);
  }
  // Permet d'afficher une notification si la techno a bien été supprimée ou modifié et de recharger la liste des technos
  useEffect(() => {
    if (successDelete) {
      toast.error(`🦄 ${successDelete}`);
      dispatch(deleteMessageAdd());
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
    <div className="relative mx-auto">
      <table className="text-xs text-center mx-auto w-[80%] sm:w-[40%]">
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
                <td className="whitespace-nowrap align-middle">
                  <div className="rounded">
                    {project.status}
                  </div>
                </td>
                <td className="flex justify-around">
                  <button>
                    <Eye className="w-4" />
                    </button>
                  <button onClick={() => {
                    setShowModalUpdateProject(true);
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
        {showModalUpdateProject && (
          <div>

          </div>
        )}
        {deleteConfirmation && (
          <DeleteConfirmation
            type="projects"
            id={selectedProjectId!}
            closeModal={() => setDeleteConfirmation(false)}
          />
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => closeSection('projects')} className="py-2 px-4 rounded-full bg-secondary20 border-2 border-solid">Retour</button>
      </div>
    </div>
  );
}

export default Admin_Projects;