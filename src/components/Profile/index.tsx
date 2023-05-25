import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getMemberById } from "../../store/reducers/user";
import { Project } from "../../@types/project";

function UserProfile() {

  // state qui défini si l'utilisateur est connecté ou non
  const isLogged = useAppSelector(state => state.login.logged)
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const memberInfo = useAppSelector(state => state.user.member)
  const projectsLists = useAppSelector(state => state.projects.lists)

  const navigate = useNavigate();


  if (!isLogged) {
    toast.warn('🦄 Veuillez vous connecter !');
    return <Navigate to="/login" replace />
  }

  useEffect(() => {
    dispatch(getMemberById(Number(id)));
  }, [id, dispatch]);

  console.log(memberInfo);

  if (!memberInfo) {
    return <div>Chargement...</div>
  }

  // Je recherche les projets de l'utilisateur dans le state des projets
  const searchProjectByUser = projectsLists.filter((project: Project) => project.author.id === memberInfo.id);
  // Je recherche les projets auxquels l'utilisateur participe dans le state des projets
  const searchProjectByMember = projectsLists.filter((project: Project) => project.memberProjet.some((member) => member.id === memberInfo.id));



  return (
    <div className="p-4">
      <div className="w-24 h-24 mx-auto rounded-full shadow-2xl">
        <img src={memberInfo.github.avatar_url} alt={memberInfo.github.login} />
      </div>
      <div className="text-center mt-2">
        <span style={{ borderColor: `${memberInfo.role.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{memberInfo.role.label}</span>
      </div>
      <div className="mt-10">
          <div className="flex justify-around gap-2">
            <div className="flex flex-col items-center">
              <p className="font-bold text-gray-700 text-xl">{searchProjectByUser.length}</p>
              <p className="text-gray-400">Projets</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-gray-700 text-xl">{searchProjectByMember.length}</p>
              <p className="text-gray-400">Participation</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-gray-700 text-xl">89</p>
              <p className="text-gray-400">Avis</p>
            </div>
        </div>
        <div className="mt-10 text-center border-b pb-12">
          <h1 className="text-2xl font-medium">{memberInfo.github.login ? memberInfo.github.login : memberInfo.username}</h1>
          <p className="font-light mt-3">{memberInfo.first_name} {memberInfo.last_name}</p>
        </div>
        <div className=" mx-auto flex space-x-2 justify-center border-2 border-solid border-primary1 flex-wrap gap-2 pb-5 rounded w-[80%]">
          <div className="p-5 mb-0 bg-primary1 w-[100%] font-bold text-center">Skills</div>
          {memberInfo.ability.length === 0 ? (
            <div>A l'ouest rien de nouveau</div>
          )
            : memberInfo.ability.map((skill) => (
              <div className="relative" key={skill.id}>
                <div key={skill.id} style={{ borderColor: `${skill.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{skill.label}</div>
              </div>
            ))}
        </div>
        <div></div>
        <div className="mt-10 flex flex-col justify-center pb-10">
          <p className="text-gray-600 text-center font-light lg:px-16">{memberInfo.bio}</p>
        </div>
        <div className="pb-5 text-center">
          <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-[white] bg-secondary20 rounded-lg focus:ring-4 focus:outline-none">
            Retour à la liste
          </button>
        </div>

      </div>
    </div>
  );
}

export default UserProfile;