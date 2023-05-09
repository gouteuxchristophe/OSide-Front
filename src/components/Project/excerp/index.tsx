import { Link } from 'react-router-dom';
import { Project } from '../../../@types/project';

function ProjectItem({
  id, title, status, author, content, member_projet,
}: Project) {
  const excerpContent = content.substring(0, 100);
  return (
    <div
      className="flex flex-col justify-center items-center mt-10 w-[90%] md:w-[40%]"
    >
      <div className="rounded-xl bg-primary0 opacity-75 m-1 w-[100%]">
        <div className="flex flex-col p-8 rounded-xl shadow-xl translate-x-4 translate-y-4 md:w-auto gap-5 bg-secondary20 bg-opacity-[50%]">
          <div className="flex flex-wrap items-center gap-2">
            <img src={author.avatar} className="w-8 rounded-full" alt={author.pseudo} />
            <p className="text-[white] font-bold">{author.pseudo}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="font-semibold text-lg md:w-[100%] md:h-20 lg:w-[50%] flex items-center">{title}</div>
            <div className="text-sm font-light border-2 border-solid rounded p-2 bg-[white]">{status}</div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 h-12 items-center">
            {member_projet.length === 0 ? (
              <div>Aucun participant</div>
            )
              : member_projet.map((member) => (
                <div className="relative w-8 h-8" key={member.id}>
                  <img className="rounded-full shadow-sm" src={member.avatar} alt={member.pseudo} />
                </div>
              ))}

          </div>
          <div className="my-4 h-12">
            <span className="font-light text-sm">
              {
                `${excerpContent}...`
              }

            </span>
          </div>
          <div className="flex justify-center text-[white]">
            <Link to={`/project/${id}`} className="px-4 py-3 rounded-full shadow-xl mt-4 bg-secondary20  text-center border-2 border-solid">
              Détails du projet
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProjectItem;
