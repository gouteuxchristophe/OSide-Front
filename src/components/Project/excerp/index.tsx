import { Project } from '../../../@types/project';

function ProjectItem({
  title, status, author, content, member_projet,
}: Project) {
  const excerpContent = content.substring(0, 100);
  return (
    <div className="bg-orange-200">
      <div>
        <div>
          <div>
            <div>
              {title}
            </div>
            <div>
              {status}
            </div>
          </div>
          <div>
            {author.pseudo}
          </div>
          <div>
            {member_projet.map((item) => (
              <div key={item.id}>
                {item.pseudo}
              </div>
            ))}
          </div>
          <div>
            {`${excerpContent}...`}
          </div>
          <div>
            <a href="/">Detail</a>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ProjectItem;
