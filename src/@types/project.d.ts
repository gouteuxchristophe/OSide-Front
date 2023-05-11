export interface Project {
  id: number
  title: string
  content: string
  status: string
  owner_id: IAuthor
  member_projet: IMemberProjet[]
  technoProjet: ITechnoProjet[]
  created_at: string
  updated_at?: string
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
