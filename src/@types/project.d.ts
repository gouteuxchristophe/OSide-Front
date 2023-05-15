import { User } from "./user"

export interface Project {
  id: number
  title: string
  content: string
  status: string
  author: User
  technoProjet: ITechnoProjet[]
  memberProjet: User[]
  created_at: string
  updated_at?: string
}


export interface ITechnoProjet {
  id: number
  label: string
  color?: string
}
