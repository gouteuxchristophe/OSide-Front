import { Navigate, useParams, Link } from 'react-router-dom';
import { Settings, MessageCircle } from 'react-feather';
import { useAppSelector } from '../../../hooks/redux';
import findProject from '../../../store/selectors/project';

function ProjectDetail() {
  // On récupère l'id du projet recherché
  const { id } = useParams();
  // On utilise la fonction findProject qui permet de trouver un projet correspondant à l'id passé
  // en paramètre et on lui envoi avec le state pour recherche
  const project = useAppSelector((state) => findProject(state.projects.lists, Number(id)));
  // Si on ne trouve pas de projet, on dirige vers la page erreur
  if (!project) {
    return <Navigate to="/error" replace />;
  }
  return (

    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0 relative justify-center">
      <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 mx-6 lg:mx-0 border-2 border-solid border-secondary10">
        <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
          <div className="block rounded-full shadow-xl mx-auto -mt-16 md:-mt-24 h-24 w-24 bg-cover bg-center border-b-4 border-solid border-secondary10" style={{ backgroundImage: `url(${project.owner_id.avatar})` }} />
          <div className="pb-5 border-b-2 border-solid border-secondary23 rounded">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold lg:pt-0 text-left">{project.title}</h1>
              <p className="flex items-center gap-2 absolute top-2 right-2">
                <Settings />
              </p>
            </div>
            <span className="bg-primary0 text-blue-800 text-xs font-medium mr-2 px-2.5 py-1 rounded">
              {project.status}
            </span>
          </div>
          <p className="pt-8 text-sm">{project.content}</p>
          <div className="flex justify-center items-center py-2 px-4 rounded-full bg-secondary20 border-2 border-solid text-[white] w-[50%] self-center">
            <MessageCircle />
            {' '}
            Voir les commentaires
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-2 pb-5 rounded">
              <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold">Participants</div>
              {/* {project.member_projet.length === 0 ? (
                <div>Aucun participant</div>
              )
                : project.member_projet.map((member) => (
                  <div className="relative w-12 h-12" key={member.id}>
                    <img
                    className="rounded-full shadow-sm" src={member.avatar} alt={member.pseudo} />
                  </div>
                ))} */}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-5 pb-5 rounded">
              <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold">Techno</div>
              {project.technoProjet.map((techno) => (
                <div key={techno.id} style={{ borderColor: `${techno.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{techno.label}</div>
              ))}
            </div>
          </div>
          <div className="pt-12 pb-8 flex justify-around flex-wrap gap-2 text-[white]">
            <button type="button" className="py-2 px-4 rounded-full bg-secondary20 border-2 border-solid">
              Participer
            </button>
            <Link to="/" className="py-2 px-4 rounded-full bg-secondary20 border-2 border-solid">
              Retour à la liste
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
