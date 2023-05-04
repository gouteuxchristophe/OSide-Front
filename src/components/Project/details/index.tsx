import { Navigate, useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import findProject from '../../../store/selectors/project';

function ProjectDetail() {
  // On récupère l'id du projet recherché
  const { id } = useParams();
  // On utilise la fonction findProjet qui permet de trouver un projet correponsdant à l'id passé
  // en paramètre et on lui envoi avec le state
  const project = useAppSelector((state) => findProject(state.projects.lists, Number(id)));
  // Si on ne trouve pas de projet, on dirige vers la page erreur
  if (!project) {
    return <Navigate to="/error" replace />;
  }
  return (
    <div className="sm m-2 text-center border-solid border border-black-200 p-2 rounded flex flex-col gap-8">
      <div className="flex justify-evenly">
        <h2>{project.title}</h2>
        <button type="button">Settings</button>
      </div>
      <p className="p-2 border-solid border border-black-200 rounded w-[200px] mx-auto">{project.status}</p>
      <div className="border-solid border border-black-200 rounded p-2 flex flex-col justify-between gap-10">
        <p>{project.content}</p>
        <button className="rounded-full bg-blue-300 p-3 w-[150px] mx-auto" type="button">Voir les commentaires</button>
      </div>
      <div className="flex flex-row gap-4 items-center flex-wrap justify-center">
        {project.member_projet.length === 0 ? (
          <div>Aucun participant</div>
        )
          : project.member_projet.map((member) => (
            <div className="relative w-12 h-1 mb-12" key={member.id}>
              <img className="rounded-full border border-gray-100 shadow-sm" src={member.avatar} alt={member.pseudo} />
            </div>
          ))}
      </div>
      <div className="flex flex-row gap-4 items-center flex-wrap justify-center">
        {project.techno_projet.length === 0 ? (
          <div>Aucune techno</div>
        )
          : project.techno_projet.map((techno) => (
            <p key={techno.id} className="border-solid border border-black-200 p-2 rounded">{techno.label}</p>
          ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="rounded-full bg-blue-300 p-3 w-[100px] mx-auto" type="button">Participer</button>
        <Link to="/" className="rounded-full bg-blue-300 p-3 w-[150px] mx-auto">Retour au projet</Link>
      </div>
    </div>
  );
}

export default ProjectDetail;
