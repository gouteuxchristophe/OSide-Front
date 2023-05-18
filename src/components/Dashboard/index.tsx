import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Project } from "../../@types/project";
import { searchProjectByUser } from "../../store/selectors/search";
import ProjectItem from "../Project/excerp";
import ModalUpdateUser from "./ModalUpdateUser";
import { createPortal } from "react-dom";
import ModalDeleteUser from "./ModalDeleteUser";

function Dashboard() {
  const user = useAppSelector(state => state.user.data)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const fakeAvatar = useAppSelector((state) => state.user.data.fakeAvatar);
  const maDate = new Date(user.created_at as string)
  const userData = useAppSelector(state => state.user.dataReception)
  const isLogged = useAppSelector(state => state.login.logged)
  const projectsLists = useAppSelector(state => state.projects.lists)
  const filterProjectsById = (id: number) => projectsLists!.filter((project) => searchProjectByUser(project, user.id)) as Project[];
  const projectOwner = filterProjectsById(user.id)

  return (
    <>
      {isLogged && (
        <>
          {!showUpdateModal ? (
            <div className="px-6 py-8">
              <div className="w-[90%] mx-auto rounded-lg shadow relative bg-secondary20">
                {!userData ? (
                  <div className="flex flex-col justify-center items-center  py-10">
                    <h2 className="text-[white]">🚧 Une erreur est survenue 🚧</h2>
                    <span className="text-[white]">Nous ne sommes pas en mesure de récupérér vos données</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-end px-4 pt-4">
                      <div className="inline-block rounded-lg text-sm p-1.5">
                        Inscrit depuit le : {maDate.toLocaleDateString("fr")}
                      </div>
                    </div>
                    <div className="flex flex-col items-center pb-10 gap-2">
                      <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={(user.github.avatar_url.length === 0) ? fakeAvatar : user.github.avatar_url} alt={user.github.login} />
                      <h5 className="mb-1 text-xl font-medium text-[white]">{user.github.login ? user.github.login : user.username}</h5>
                      <span className="text-sm text-[white]">{user.first_name} {user.last_name}</span>
                      <span className="text-sm text-[white]">{user.email}</span>
                      <span style={{ borderColor: `${user.role.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{user.role.label}</span>
                      <div className="flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-2 pb-5 rounded w-[80%]">
                        <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold text-center">Skills</div>
                        {user.ability.length === 0 ? (
                          <div>A l'ouest rien de nouveau</div>
                        )
                          : user.ability.map((skill) => (
                            <div className="relative w-12 h-12" key={skill.id}>
                              <div key={skill.id} style={{ borderColor: `${skill.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{skill.label}</div>
                            </div>
                          ))}
                      </div>
                      <div className="flex mt-4 space-x-3 md:mt-6">
                        <button onClick={() => setShowUpdateModal(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-primary0 rounded-lg focus:ring-4 focus:outline-none">Update</button>
                        <button onClick={() => setShowDeleteModal(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-[red] rounded-lg focus:ring-4 focus:outline-none">Delete</button>
                      </div>
                    </div>
                    <div className="flex flex-col mb-10 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10 overflow-hidden">
                      {projectOwner.map((item) => (
                        <ProjectItem
                          key={item.id}
                          {...item}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div>
                {showDeleteModal && createPortal(
                  <ModalDeleteUser closeModal={() => setShowDeleteModal(false)} />,
                  document.body
                )}
              </div>

            </div>
          ) : (
            <ModalUpdateUser closeModal={() => setShowUpdateModal(false)} />
          )}
        </>
      )}

    </>
  );
}

export default Dashboard;