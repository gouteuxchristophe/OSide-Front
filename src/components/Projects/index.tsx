import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import ProjectItem from '../Project/excerp';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function Projects() {
  const projectsList = useAppSelector((state) => state.projects.lists);
  const projectsListWithOwner = projectsList.filter((project) => project.author.delete_at === null);
  const errorApiProjects = useAppSelector((state) => state.projects.errorApiProjects);
  const location = useLocation();
  console.log(projectsList)
  console.log(projectsListWithOwner)
  // Permet de récupérer les 3 derniers projets
  const lastProject = projectsListWithOwner.slice(0, 3);

   // Affiche la notification si la requête a échoué
 useEffect(() => {
  if (errorApiProjects) {
    toast.error(`🦄 ${errorApiProjects} !`);
  }
}, [errorApiProjects]);

  return (
    <div className="flex flex-col mb-10 items-center md:flex-row md:flex-wrap md:justify-center md:gap-10 overflow-hidden w-full">
      {(location.pathname === '/') && (
        <div className="w-[90%] lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-xl bg-white opacity-75 lg:mx-0 border-2 border-solid border-secondary10 mt-2">
          <div className="p-4 md:p-12 text-center lg:text-left flex flex-col gap-7 relative bg-sky">
            <div className="flex flex-col items-center justify-between mb-3 tracking-wider ">
              <p>
                Bienvenue sur notre plateforme, le lieu de rencontre des développeurs web et mobile passionnés. 
                Ici, vous pouvez partager vos idées de projets, explorer des initiatives alignées avec vos compétences 
                et demander à y participer. Si vous cherchez le projet idéal, utilisez notre formulaire 
                de recherche personnalisé. Rejoignez-nous pour transformer vos idées 
                en réalité et propulser vos projets au niveau supérieur. Nous sommes ravis de vous aider à développer, apprendre 
                et collaborer dans cet espace dédié à l'innovation.
              </p>
            </div>
          </div>
        </div>
      )}
    {/* Affiche du component project en fonction de la page demandée */}
      {(location.pathname === '/')
        ?
          <Carousel showIndicators={true} showStatus={false} useKeyboardArrows showThumbs={false}>
          {lastProject.map((item) => (
            <ProjectItem
              key={item.id}
              {...item}
            />
          ))}
        </Carousel>
        :
        projectsListWithOwner.map((item) => (
          <ProjectItem
            key={item.id}
            {...item}
          />
        ))}
    </div>


  );
}

export default Projects;
