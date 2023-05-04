import { Project } from '../../@types/project';

function findProject(projects: Project[], searchedId: number) {
  const project = projects.find((testedProject) => testedProject.id === searchedId);
  return project;
}

export default findProject;
