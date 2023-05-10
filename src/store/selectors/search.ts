import { Project } from '../../@types/project';

export function searchProjectByTitle(project: Project, value: string) {
  const projectResult = project.title.toLowerCase().includes(value.toLowerCase());
  return projectResult;
}

export function searchProjectByTechno(project: Project, value: string) {
  const projectResult = project.techno_projet.find((techno) => techno.label === value);
  return projectResult;
}
