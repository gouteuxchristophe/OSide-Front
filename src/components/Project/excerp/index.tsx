import { Link } from 'react-router-dom';
import { Project } from '../../../@types/project';

function ProjectItem({
  id, title, status, author, content, member_projet,
}: Project) {
  const excerpContent = content.substring(0, 100);
  return (
    <div className="border-solid border border-black-200 p-4 rounded">
      <div className="flex flex-col gap-2 space-y-6 items-center align-middle ">
        <div className="flex flex-row gap-2 items-center align-middle h-12">
          <div className="text-center">
            {title}
          </div>
          <div className="border-solid border border-black-200 p-2 rounded text-center">
            {status}
          </div>
        </div>
        <div className="self-start ">
          {author.pseudo}
        </div>
        <div className="flex flex-row gap-4 items-center h-12">
          {member_projet.length === 0 ? (
            <div>Aucun participant</div>
          )
            : member_projet.map((item) => (
              <div className="relative w-12 h-1 mb-12" key={item.id}>
                <img className="rounded-full border border-gray-100 shadow-sm hover:scale-[1.7]" src={item.avatar} alt={item.pseudo} />
              </div>
            ))}

        </div>
        <div className="h-20">
          {`${excerpContent}...`}
        </div>
        <div>
          <Link className="p-2 mb-2 bg-green-200 rounded-full" to={`/project/${id}`}>Detail</Link>
        </div>
      </div>

    </div>

  );
}

export default ProjectItem;
