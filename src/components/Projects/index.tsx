import { useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';

function Projects() {
  // On récupère le state
  const projectsList = useAppSelector((state) => state.projects.lists);

  return (

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 p-10">
      {projectsList.map((item) => (
        <ProjectItem
          key={item.id}
          {...item}
        />
      ))}
    </div>

  );
}

export default Projects;
