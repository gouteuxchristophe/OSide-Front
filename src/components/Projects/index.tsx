import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Projects() {
  const projectsList = useAppSelector((state) => state.projects.lists);
  const location = useLocation();

  const lastProject = projectsList.slice(0, 3);

  return (

    <div className="flex flex-col mb-10 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10 overflow-hidden">
      {(location.pathname === '/') && (
        <div className="w-[90%] lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 lg:mx-0 border-2 border-solid border-secondary10 mt-2">
          <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative">
            <div className="flex flex-col items-center justify-between mb-3">
              <p>
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Molestias illo nesciunt
                eaque labore rerum sit, laudantium
                temporibus expedita cupiditate saepe,
                unde fuga reprehenderit! Labore deleniti,
                repellat maxime veniam modi consequuntur.
              </p>
            </div>
          </div>
        </div>
      )}

      {(location.pathname === '/')
        ?
          <Carousel showIndicators={true} showStatus={false} useKeyboardArrows>
          {lastProject.map((item) => (
            <ProjectItem
              key={item.id}
              {...item}
            />
          ))}
        </Carousel>
        :
        projectsList.map((item) => (
          <ProjectItem
            key={item.id}
            {...item}
          />
        ))}
    </div>


  );
}

export default Projects;
