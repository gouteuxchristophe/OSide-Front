import { Project } from '../../@types/project';

/**
 * Fonction qui récupère les projets selon la technologie
 * @param project Projet filtré
 * @param value Chaine de caractère récupérer dans l'input search
 * @returns un tableau d'objet de projets
 */
export function searchProjectByTitle(project: Project, value: string) {
  const projectResult = project.title.toLowerCase().includes(value.toLowerCase());
  return projectResult;
}

/**
 * Fonction qui récupère les projets selon la technologie
 * @param project Projet filtré
 * @param value Technologie recherché
 * @returns un tableau d'objet de projets
 */
export function searchProjectByTechno(project: Project, value: string) {
  const projectResult = project.technoProjet.find((techno) => techno.label === value);
  return projectResult;
}

/**
 * Fonction qui récupère les projets selon le user
 * @param project Projet filtré
 * @param value Id recherché
 * @returns un tableau d'objet de projets
 */
export function searchProjectByUser(project: Project, id: number) {
  const projectResult = project.author.id === id;
  return projectResult;
}