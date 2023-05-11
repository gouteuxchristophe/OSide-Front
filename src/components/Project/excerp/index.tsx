import { Link } from 'react-router-dom';
import { Project } from '../../../@types/project';

function ProjectItem({
  id, title, status, owner_id, content, technoProjet,
}: Project) {
  const excerpContent = content.substring(0, 100);
  return (
    <div
      className="flex flex-col justify-center items-center mt-10 w-[90%] md:w-[40%]"
    >
      <div className="rounded-xl bg-primary0 opacity-75 m-1 w-[100%]">
        <div className="flex flex-col p-8 rounded-xl shadow-xl translate-x-4 translate-y-4 md:w-auto gap-5 bg-secondary20 bg-opacity-[50%]">
          <div className="flex flex-wrap items-center gap-2">
            <img src={owner_id.avatar} className="w-8 rounded-full" alt={owner_id.pseudo} />
            <p className="text-[white] font-bold">{owner_id.pseudo}</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-semibold text-lg flex items-center">{title}</div>
            <span className="bg-primary0 text-xs font-medium mr-2 px-2.5 py-1 rounded text-[white] border-2 border-solid">{status}</span>
          </div>
          <div className="flex space-x-2 justify-center flex-wrap gap-5 pb-5 rounded">
            {technoProjet.length === 0 ? (
              <div>Aucune techno</div>
            )
              : technoProjet.map((techno) => (
                <div key={techno.id} style={{ borderColor: `${techno.color}` }} className="bg-[white] border-2 border-solid text-sm px-3 rounded-full pt-[0.1em] pb-[0.1em]">{techno.label}</div>
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
