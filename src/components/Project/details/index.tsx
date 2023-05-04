import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import findProject from '../../../store/selectors/project';

function ProjectDetail() {
  // On récupère l'id du projet recherché
  const { projectId } = useParams();
  // On utilise la fonction findProjet qui permet de trouver un projet correponsdant à l'id passé
  // en paramètre
  const project = useAppSelector((state) => findProject(state.projects.lists, Number(projectId)));
  // Si on ne trouve pas de projet, on dirige vers la page erreur
  if (!project) {
    return <Navigate to="/error" replace />;
  }
  return (
    <div className="sm m-2 text-center border-solid border border-black-200 p-2 rounded flex flex-col gap-8">
      <div className="flex justify-evenly">
        <h2>Titre du projet</h2>
        <button type="button">Settings</button>
      </div>
      <p className="p-2 border-solid border border-black-200 rounded w-[200px] mx-auto">Statut du projet</p>
      <div className="border-solid border border-black-200 rounded p-2 flex flex-col justify-between h-[200px]">
        <p>Détails du projets</p>
        <button className="rounded-full bg-blue-300 p-3 w-[150px] mx-auto" type="button">Voir les commentaires</button>
      </div>
      <div className="flex flex-row gap-4 items-center flex-wrap justify-center">
        <img className="rounded-full border border-gray-100 shadow-sm" src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
        <img className="rounded-full border border-gray-100 shadow-sm" src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
        <img className="rounded-full border border-gray-100 shadow-sm" src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
      </div>
      <div className="flex flex-row gap-4 items-center flex-wrap justify-center">
        <p className="border-solid border border-black-200 p-2 rounded">Techno 1</p>
        <p className="border-solid border border-black-200 p-2 rounded">Techno 1</p>
        <p className="border-solid border border-black-200 p-2 rounded">Techno 1</p>
        <p className="border-solid border border-black-200 p-2 rounded">Techno 1</p>

      </div>
      <button className="rounded-full bg-blue-300 p-3 w-[100px] mx-auto" type="button">Participer</button>
    </div>
  );
}

export default ProjectDetail;
