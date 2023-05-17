import { Project } from '../../@types/project';

/**
 * La fonction trouve un projet dans un tableau de projets en fonction d'un ID donné.
 * @param {Project[]} projects - un tableau de projets
 * @param {number} searchedId - L'ID recherché
 * @returns La fonction `findProject` renvoie un objet `Project` qui correspond à `searchedId`
 * paramètre. Si aucun projet correspondant n'est trouvé, la fonction renverra `undefined`.
 */
function findProject(projects: Project[], searchedId: number) {
  console.log(projects);
  
  const project = projects.find((testedProject) => testedProject.id === searchedId);
  return project;
}

export default findProject;
