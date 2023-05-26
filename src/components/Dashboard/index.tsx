import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Project } from "../../@types/project";
import { searchProjectByUser } from "../../store/selectors/search";
import ProjectItem from "../Project/excerp";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import { getUserDataFromLocalStorage } from "../../utils/login";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GitHub } from "react-feather";
import { getUserById, resetSuccessUpdate, updateUser } from "../../store/reducers/user";

function Dashboard() {
  const user = useAppSelector(state => state.user.data)
  // State des modals
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  // state pour la date de création du compte
  const maDate = new Date(user.created_at as string)
  // state qui défini si l'utilisateur est connecté ou non
  const isLogged = useAppSelector(state => state.login.logged)
  // Récupère la liste des projets
  const projectsLists = useAppSelector(state => state.projects.lists)
  // Filtrer les projets par id
  // Récupérer l'id de l'utilisateur via le sessionStorage
  const userData = getUserDataFromLocalStorage();
  const [pseudoGitHub, setPseudoGitHub] = useState<string>('')
  const updateMessage = useAppSelector(state => state.user.successUpdate)

  const dispatch = useAppDispatch();

  // Redirige l'utilisateur vers la page d'accueil si il n'est pas connecté
  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }

  const filterProjectsById = (id: number) => projectsLists!.filter((project) => searchProjectByUser(project, userData!.id)) as Project[];
  const projectOwner = filterProjectsById(user.id)

  // Fonction pour afficher les modals en fonction du bouton cliqué
  const handleShowUpdate = () => {
    setShowModal(!showModal)
    setShowUpdateModal(!showUpdateModal)
  }
  const handleShowDelete = () => {
    setShowModal(!showModal)
    setShowDeleteModal(!showDeleteModal)
  }

  useEffect(() => {
    dispatch(getUserById())
    dispatch(resetSuccessUpdate())
  }, [updateMessage])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLinkGitHubAuth = () => {
    // je fais une requete a github pour récupérer l'id github en fonction du pseudo
    const url = `https://api.github.com/users/${pseudoGitHub}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const idGitHub = data.id
        const dataGithub = {
          github_id: idGitHub,
          id: user.id
        }
        if (!idGitHub) {
          toast.error('🦄 Ce pseudo n\'existe pas !');
          return
        }
        dispatch(updateUser(dataGithub))
        toast.success('🦄 Votre compte GitHub a bien été lié !');
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleUnlinkGitHubAuth = () => {
    const dataGithub = {
      github_id: null,
      id: user.id
    }
    dispatch(updateUser(dataGithub))
    toast.success('🦄 Votre compte GitHub a bien été délié !');
    dispatch(getUserById())
  }


  return (
    <>
      {!showModal ? (
        <div className="px-2 py-8">
          <div className="w-full mx-auto relative">
            <div className="flex justify-center px-4 pt-4">
              <div className="inline-block rounded-lg text-sm p-1.5">
                Inscrit depuis le : {maDate.toLocaleDateString("fr")}
              </div>
            </div>
            <div className="flex flex-col items-center pb-10 gap-2">
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.avatar_url} alt={user.github.login} />
              <h5 className="mb-1 text-xl font-medium text-secondary20">{user.github.login ? user.github.login : user.username}</h5>
              <span className="text-sm text-secondary20">{user.first_name} {user.last_name}</span>
              <span className="text-sm text-secondary20">{user.email}</span>
              <span style={{ borderColor: `${user.role.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{user.role.label}</span>
              <div className="flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-2 pb-5 rounded w-[80%]">
                <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold text-center">Bio</div>
                {!user.bio ? (
                  <div>Pas de biographie</div>
                )
                  : <div className="p-5 mb-0 bg-[white] w-[100%] text-center">{user.bio}</div>}

              </div>
              <div className="flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-2 pb-5 rounded w-[80%]">
                <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold text-center">Skills</div>
                {user.ability.length === 0 ? (
                  <div>A l'ouest rien de nouveau</div>
                )
                  : user.ability.map((skill) => (
                    <div className="relative" key={skill.id}>
                      <div key={skill.id} style={{ borderColor: `${skill.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{skill.label}</div>
                    </div>
                  ))}
              </div>
              <div>
                {user.github.id ? (
                  <button onClick={handleUnlinkGitHubAuth} className='flex gap-2 text-[white] bg-primary0 font-medium rounded-lg text-sm px-5 py-2.5 text-center' > <GitHub className='text-[black]' />Unlink Github</button>
                )
                  : (
                      <div className="flex">
                        <div className="pointer-events-none bg-primary0 rounded-l-lg flex items-center px-2">
                          <GitHub />
                        </div>
                        <input onChange={(e) => setPseudoGitHub(e.currentTarget.value)} type="search" className="block w-full p-4 pl-2 text-sm " placeholder="Pseudo GitHub" required />
                        <button onClick={handleLinkGitHubAuth} type="submit" className="bg-primary0 right-2.5 bottom-2.5 font-medium text-sm px-4 py-2 rounded-r-lg">Link</button>
                      </div>
                  )
                }

              </div>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <button onClick={() => handleShowUpdate()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-primary0 rounded-lg focus:ring-4 focus:outline-none">Update</button>
                <button onClick={() => handleShowDelete()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-[red] rounded-lg focus:ring-4 focus:outline-none">Delete</button>
              </div>
            </div>
            <div className="flex flex-col pb-10 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10 overflow-hidden">
              <h2 className="text-secondary20 font-bold text-lg w-full text-center">Mes projets</h2>
              {projectOwner.map((item) => (
                <ProjectItem
                  key={item.id}
                  {...item}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <>
            {showUpdateModal && (
              <ModalUpdateUser closeModal={() => handleShowUpdate()} />
            )}
          </>
          <>
            {showDeleteModal && (
              <ModalDeleteUser closeModal={() => handleShowDelete()} />
            )}
          </>
        </>
      )}
    </>
  );
}

export default Dashboard;