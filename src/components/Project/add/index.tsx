import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import AddTechno from "../../Modals/AddTechno";
import { useEffect, useState } from "react";
import { createProject, deleteMessageAdd, newProject } from "../../../store/reducers/projects";

function AddProjects() {

  const isLogged = useAppSelector((state) => state.login.logged);
  const user = useAppSelector((state) => state.user.data);
  const fakeAvatar = useAppSelector((state) => state.user.data.fakeAvatar);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const successAdd = useAppSelector((state) => state.projects.successAdd);
  const idNewProject = useAppSelector((state) => state.projects.idNewProject);

  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }
  const navigate = useNavigate();
  useEffect(() => {
    if(successAdd) {
      toast.success(`🦄 ${successAdd}`);
      dispatch(deleteMessageAdd())
      navigate(`/project/${idNewProject}`);
    }
  }, [successAdd]);


  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = {
      title: title,
      content: content,
      status: 'En cours',
      owner_id: user.id,
    }
    dispatch(createProject(newProject as newProject));
  }

  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto lg:my-0 relative justify-center">
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
                <div className="flex justify-around">
                  <label htmlFor="title">Titre</label>
                  <input onChange={(e) => setTitle(e.currentTarget.value)} type="text" name="" id="" />
                </div>
                <div className="flex justify-around items-center">
                  <label htmlFor="content">Description</label>
                  <textarea onChange={(e) => setContent(e.currentTarget.value)} />
                </div>
                <div className="flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-5 pb-5 rounded">
                  <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold">Techno</div>
                  <AddTechno closeModal={() => setShowModal(false)} />
                </div>
                <div>
                  <button className="bg-secondary20 text-[white] font-medium rounded text-sm px-5 py-2.5 text-center" type="submit">Envoyer</button>
                </div>
              </form>
            </div>
          </div>
          <div className="pt-12 pb-8 flex justify-around flex-wrap gap-2 text-[white]">
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProjects;