import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import AddTechno from "../../Modals/AddTechno";
import { useEffect, useState } from "react";
import { createProject, deleteMessageAdd, getAllProjects, newProject } from "../../../store/reducers/projects";
import { getAllTechnos } from "../../../store/reducers/techno";

function AddProjects() {

  const isLogged = useAppSelector((state) => state.login.logged);
  const user = useAppSelector((state) => state.user.data);
  const fakeAvatar = useAppSelector((state) => state.user.data.fakeAvatar);
  const [showModalAddTechno, setShowModalAddTechno] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const successAdd = useAppSelector((state) => state.projects.successAdd);
  const idNewProject = useAppSelector((state) => state.projects.idNewProject);
  const technoSelected = useAppSelector((state) => state.techno.selectedTechnos);
  const technoList = useAppSelector((state) => state.techno.technoLists);

  useEffect(() => {
    dispatch(getAllTechnos());
  }, [technoSelected]);


  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (successAdd) {
      toast.success(`🦄 ${successAdd}`);
      dispatch(deleteMessageAdd())
      navigate(`/project/${idNewProject}`);
    }
  }, [successAdd]);


  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Je compare la liste technoSelected avec la technoList pour récupérer les id des technos sélectionnées en fonction des labels
    const idTechnos = technoSelected.map((techno) => {
      const technoFind = technoList.find((technoList) => technoList.label === techno.label);
      return technoFind?.id;
    })
    const newProject = {
      title: title,
      content: content,
      status: 'En cours',
      owner_id: user.id,
      technoProjet: idTechnos
    }
    dispatch(createProject(newProject as newProject));
  }

  return (
    <>
      {showModalAddTechno ? (
        <AddTechno closeModal={() => setShowModalAddTechno(false)} />
      ) : (
        <div className="px-10 pt-2 sm:mt-[2rem] rounded w-full ">
          <div className="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 mx-6 lg:mx-0 border-2 border-solid border-secondary10">
            <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
              <div className="block rounded-full shadow-xl mx-auto -mt-16 md:-mt-24 h-24 w-24 bg-cover bg-center border-b-4 border-solid border-secondary10" style={{ backgroundImage: `url(${!user.github.avatar_url ? fakeAvatar : user.github.avatar_url})` }} />
              <div className="pb-5 border-b-2 border-solid border-secondary23 rounded">
                <h2>Ajout d'un projet</h2>
                <div className="flex items-center justify-between mb-3">
                  <h1 className="text-2xl font-bold lg:pt-0 text-left"></h1>
                </div>
                <div>
                  <form onSubmit={handleAddProject} className="flex flex-col gap-5">
                    <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                      <label htmlFor="firstname" className="w-[90%] text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Title</label>
                      <input type="text" className="shadow-sm text-sm rounded block p-2.5 sm:w-[40%]" placeholder="Titre" />
                    </div>
                    <div className="mb-2 sm:mb-6 flex flex-col items-center justify-center sm:gap-5 w-full">
                      <label htmlFor="lastname" className="text-center block text-sm font-medium sm:w-[90%] sm:pb-0 pb-2">Content</label>
                      <textarea className="shadow-sm text-sm rounded block p-2.5 w-full" placeholder="Description" />
                    </div>
                    <div className="flex flex-col items-center space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-5 pb-5 rounded">
                      <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold">Techno</div>
                      <button onClick={() => setShowModalAddTechno(true)} className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center">Ajouter une techno</button>
                      <div className="flex flex-wrap gap-2 justify-center items-center">
                        {technoSelected.map((techno) => (
                          <div className="relative" key={`${techno.id}-${techno.label}`}>
                            <span className={`p-2 bg-[white] rounded border border-solid border-${techno.color}`}>{techno.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <button className="bg-primary0 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center" type="submit">Envoyer</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="pt-12 pb-8 flex justify-around flex-wrap gap-2 text-[white]">
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  );
}

export default AddProjects;