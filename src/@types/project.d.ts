export interface Project {
  id: number
  title: string
  author: IAuthor
  content: string
  member_projet: IMemberProjet[]
  techno_projet: ITechnoProjet[]
  created_at: string
  updated_at?: string
  status: string
}

export interface IAuthor {
  id: number
  pseudo: string
  avatar?: string
}

export interface IMemberProjet {
  id: number
  pseudo: string
  avatar?: string
}

export interface ITechnoProjet {
  id: number
  label: string
  color?: string
}
