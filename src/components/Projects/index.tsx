import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';

function Projects() {
  // On récupère le state

  const projectsList = useAppSelector((state) => state.projects.lists);
  const location = useLocation();

  const lastProject = projectsList.slice(0, 3);

  return (

    <div className="flex flex-col mb-10 mr-4 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10">
      {(location.pathname === '/')
        ? lastProject.map((item) => (
          <ProjectItem
            key={item.id}
            {...item}
          />
        ))
        : projectsList.map((item) => (
          <ProjectItem
            key={item.id}
            {...item}
          />
        ))}
    </div>

  );
}

export default Projects;
