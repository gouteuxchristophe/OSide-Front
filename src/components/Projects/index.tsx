import { useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';

function Projects() {
  // On récupère le state
  const projectsList = useAppSelector((state) => state.projects.lists);

  return (

    <div className="flex flex-col mb-10 mr-4 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10">
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
