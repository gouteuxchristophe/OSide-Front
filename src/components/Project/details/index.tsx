import { Navigate, useParams, useNavigate} from 'react-router-dom';
import { Settings, MessageCircle } from 'react-feather';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import {
  deleteMessageUpdate,
  getProjectByID,
  getAllProjects,
  deleteMessageDelete,
  deleteProjectErrorMessage,
  participateProject,
  leaveProject,
  deleteMessageParticipate,
  deleteMessageLeave,
} from '../../../store/reducers/projects';
import DeleteConfirmation from '../../Admin/deleteConfirmation';
import ModalUpdateProject from './ModalUpdateProject';
import ConfettiExplosion from 'react-confetti-explosion';
import Comments from './comments';

function ProjectDetail() {
  // Permet de savoir si l'utilisateur est connecté
  const isLogged = useAppSelector((state) => state.login.logged);
  // Permet de savoir si la requête API est en cours
  const isLoading = useAppSelector((state) => state.projects.isLoading);
  // state du modal
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // state des messages de succès
  const successDelete = useAppSelector((state) => state.projects.successDelete)
  const successUpdate = useAppSelector((state) => state.projects.successUpdate);
  const errorApiProjects = useAppSelector((state) => state.projects.errorApiProjects);
  const successParticipate = useAppSelector((state) => state.projects.successParticipate)
  const successLeave = useAppSelector((state) => state.projects.successLeave)
  const [isExploding, setIsExploding] = useState(false);
  // Permet d'afficher la bulle d'info du user
  const [isHovered, setIsHovered] = useState(false);
  // Permet d'afficher ou masquer les commentaires
  const [showComments, setShowComments] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  // Redirige l'utilisateur vers la page d'accueil si il n'est pas connecté
  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }


  // On récupère l'id du projet recherché
  const { id } = useParams();
  const idUser = useAppSelector((state) => state.user.data.id);

  // Permet de récupérer les données du projet
  useEffect(() => {
    dispatch(getProjectByID(id as unknown as number));
  }, [id, dispatch]);

  // Afficher un toast si le projet a bien été supprimé
  useEffect(() => {
    if (successDelete) {
      toast.success(`🦄 ${successDelete}`);
      dispatch(getAllProjects())
      dispatch(deleteMessageDelete())
      navigate('/dashboard')
    }
    if (successUpdate) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success(`🦄 ${successUpdate}`);
      dispatch(deleteMessageUpdate())
      dispatch(getProjectByID(id as unknown as number));
    }
    if (errorApiProjects) {
      toast.error(`🦄 ${errorApiProjects}`);
      dispatch(deleteProjectErrorMessage())
    }
    if (successParticipate) {
      dispatch(deleteMessageParticipate())
      setIsExploding(true)
      toast.success(`🦄 ${successParticipate}`);
      dispatch(getProjectByID(id as unknown as number));
    }
    if (successLeave) {
      dispatch(deleteMessageLeave())
      toast.warn(`🦄 ${successLeave}`);
      dispatch(getProjectByID(id as unknown as number));
    }
  }, [successDelete, successUpdate, errorApiProjects, successParticipate, successLeave]);

  const project = useAppSelector((state) => state.projects.projectByID)

  const handleParticipate = () => {
    const data = {
      id: project.id,
      userId: idUser
    }
    dispatch(participateProject(data))
  }
  const handleLeave = () => {
    const data = {
      id: project.id,
      userId: idUser
    }
    dispatch(leaveProject(data))
  }

  const largeProps = {
    force: 1,
    duration: 5000,
    particleCount: 500,
    height: '200vh',
    width: 1600,
    zIndex: 100,
    colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805', 'F0F'],
    onComplete: () => setIsExploding(false),
  };

  if (isLoading) {
    return <div>Loading...</div>
  }
  // Tableau des membres du projet qui retourne true si l'id de l'utilisateur est présent   
  const alreadyParticipated = project.memberProjet.some((member) => member.id === idUser)

  // Si on ne trouve pas de projet, on dirige vers la page erreur
  if (!project) {
    return <Navigate to="/error" replace />;
  }

  return (

    <div className="flex items-center flex-wrap my-5 relative justify-center py-10">
      {!showUpdateModal && (
        <div className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 mx-6 lg:mx-0 border-2 border-solid border-secondary10">
          <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
            <div
              className="block rounded-full shadow-xl mx-auto -mt-16 md:-mt-24 h-24 w-24 bg-cover bg-center border-b-4 border-solid border-secondary10"
              style={{ backgroundImage: `url(${project.author.avatar_url})` }}
            />
            <div className="pb-5 border-b-2 border-solid border-secondary23 rounded">
              <div className="flex items-center justify-between mb-3">
                <div className='absolute'>
                  {isExploding && <ConfettiExplosion  {...largeProps} />}
                </div>
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
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-2 pb-5 rounded">
                <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold">Participants</div>
                {project.memberProjet.length === 0 ? (
                  <div>Aucun participant</div>
                )
                  : project.memberProjet.map((member) => (
                    <div className="relative w-12 h-12" key={member.id}>
                      <img onClick={() => navigate(`/profile/${member.id}`)} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                        className="rounded-full shadow-sm" src={member.avatar_url} alt={(member.github.login.length === 0) ? member.username : member.github.login} />
                      <>
                        {isHovered && (
                          <div className='absolute bottom-0 left-20'>
                            <div className="w-full bg-[white] border border-solid border-primary0 rounded shadow px-5">
                              <div className="flex justify-end px-4 pt-4">
                              </div>
                              <div className="flex flex-col items-center pb-10">
                                <img className="w-24 h-24 rounded-full shadow-sm" src={member.avatar_url} alt={(member.github.login.length === 0) ? member.username : member.github.login} />
                                <h5 className="mb-1 text-xl font-medium ">{member.github.login}</h5>
                                <span className="text-sm">{member.bio}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
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
              {idUser != project?.author.id && (
                <>
                  {alreadyParticipated ? (
                    <button type="button" onClick={handleLeave} className="group relative h-12 w-48 overflow-hidden rounded-lg bg-[white] text-lg shadow">
                      <div className="absolute inset-0 w-3 bg-[red] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                      <span className="relative text-[black] group-hover:text-[white]">Quitter le projet !</span>
                    </button>
                  ) : (
                    <button type="button" onClick={handleParticipate} className={`${(project.status === 'Equipe complète') ? 'disabled' : ''} group relative h-12 w-48 overflow-hidden rounded-lg bg-[white] text-lg shadow`}>
                      <div className="absolute inset-0 w-3 bg-[green] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                      <span className="relative text-[black] group-hover:text-[white]">Participer au projet !</span>
                    </button>
                  )}
                </>

              )
              }
              <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">
                Retour à la liste
              </button>
              <>
                {idUser === project?.author.id &&
                  <>
                    {project.status === 'Equipe complète' && (
                      <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">
                        Push sur Github
                      </button>
                    )}
                    <button onClick={() => setShowDeleteModal(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-[red] rounded-lg focus:ring-4 focus:outline-none">Delete</button>
                  </>
                }
              </>
              {showDeleteModal && (
                <DeleteConfirmation
                  type="projectsUser"
                  id={project.id}
                  closeModal={() => setShowDeleteModal(false)} />)
              }
            </div>
            {!showComments ? (
              <div onClick={() => setShowComments(true)} className=" cursor-pointer flex justify-center items-center py-2 px-4 rounded bg-secondary20 text-[white] w-[50%] self-center">
                <MessageCircle />
                {' '}
                Voir les commentaires
              </div>
            ) : (
              <div onClick={() => setShowComments(false)} className="cursor-pointer flex justify-center items-center py-2 px-4 rounded bg-secondary20 text-[white] w-[50%] self-center">
                <MessageCircle />
                {' '}
                Masquer les commentaires
              </div>
            )}
            <div className={`comment-content ${showComments ? 'active' : ''}`}>
              <Comments
                comments={project.comment}
                ownerProject={project.author.id} />
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
