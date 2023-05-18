import { useEffect, useState } from "react";
import { getAllProjects } from "../../store/reducers/projects";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Edit3, Eye, Trash2 } from "react-feather";

function Admin_Projects({ closeSection }: { closeSection: (value: string) => void }) {

  const projectsList = useAppSelector((state) => state.projects.lists);
  const [showModalUpdateProject, setShowModalUpdateProject] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProjects())
  }, [dispatch])

  const handleDeleteProject = (id: number): void => {
    throw new Error("Function not implemented.");
  }

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
                  <button onClick={() => handleDeleteProject(project.id)}>
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
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => closeSection('projects')} className="py-2 px-4 rounded-full bg-secondary20 border-2 border-solid">Retour</button>
      </div>
    </div>
  );
}

export default Admin_Projects;