import { Navigate, useParams, Link } from 'react-router-dom';
import { Settings, MessageCircle } from 'react-feather';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { 
  deleteMessageUpdate,
  deleteMessageAdd,
  deleteProject,
  getProjectByID,
} from '../../../store/reducers/projects';
import { createPortal } from 'react-dom';
import DeleteConfirmation from '../../Admin/deleteConfirmation';
import ModalUpdateProject from './ModalUpdateProject';

function ProjectDetail() {
  const isLogged = useAppSelector((state) => state.login.logged);
  const fakeAvatar = useAppSelector((state) => state.user.data.fakeAvatar);
  const isLoading = useAppSelector((state) => state.projects.isLoading);
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const successUpdate = useAppSelector((state) => state.projects.successUpdate);

  // Redirige l'utilisateur vers la page d'accueil si il n'est pas connecté
  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }
  // On récupère l'id du projet recherché
  const { id } = useParams();
  const idUser = useAppSelector((state) => state.user.data.id); 

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProjectByID(id as unknown as number));
  }, [id, dispatch]);

  const handleDeleteProject = () => {
    setDeleteConfirmation(true);
  }
  useEffect(() => {
    if (successUpdate) {
      toast.success(`🦄 ${successUpdate}`);
      dispatch(deleteMessageUpdate())
      dispatch(getProjectByID(id as unknown as number));
    }
  }, [successUpdate]);


  const project = useAppSelector((state) => state.projects.projectByID)
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  // Si on ne trouve pas de projet, on dirige vers la page erreur
  if (!project) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className="flex items-center h-auto lg:h-screen flex-wrap my-2 lg:my-0 relative justify-center py-10">
      {!showUpdateModal && (
        <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 mx-6 lg:mx-0 border-2 border-solid border-secondary10">
          <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
            <div 
              
              className="block rounded-full shadow-xl mx-auto -mt-16 md:-mt-24 h-24 w-24 bg-cover bg-center border-b-4 border-solid border-secondary10" 
              
              style={{ backgroundImage: `url(${!project.author.github.avatar_url ? fakeAvatar : project.author.github.avatar_url})` }} 
            
            />
            <div className="pb-5 border-b-2 border-solid border-secondary23 rounded">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-2xl font-bold lg:pt-0 text-left">{project.title}</h1>
                {/* On vérifie si le user qui est sur la page du projet est son créateur */}
                {idUser === project?.author.id &&
                  <button type="button" className="flex items-center gap-2 absolute top-2 right-2" onClick={() => setShowUpdateModal(true)}>
                    <Settings />
                  </button>
                }
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
                {project.memberProjet.length === 0 ? (
                  <div>Aucun participant</div>
                )
                  : project.memberProjet.map((member) => (
                    <div className="relative w-12 h-12" key={member.id}>
                      <img
                        className="rounded-full shadow-sm" src={(member.github.avatar_url.length === 0) ? fakeAvatar : member.github.avatar_url} alt={(member.github.login.length === 0) ? member.username : member.github.login} />
                    </div>
                  ))}
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
              {idUser === project?.author.id &&
                <button onClick={() => setShowDeleteModal(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-[red] rounded-lg focus:ring-4 focus:outline-none">Delete</button>
              }
              {showDeleteModal && createPortal(
                <DeleteConfirmation 
                type="projectsUser"
                id={project.id}
                closeModal={() => setShowDeleteModal(false)} />, document.body)
              }
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <ModalUpdateProject 
        project={project}
        closeModal={() => setShowUpdateModal(false)} />
      )}
    </div>


  );
}

export default ProjectDetail;
