import { User } from "./user"

export interface Project {
  id: number
  title: string
  content: string
  status: string
  author: User
  comment : IComment[]
  technoProjet: ITechnoProjet[]
  memberProjet: User[]
  created_at?: string
  updated_at?: string
}


export interface ITechnoProjet {
  id?: number
  label: string
  color?: string
}

export interface IComment {
  id: number
  content: string
  projet_id: number
  created_at: string
  commentUser: IAuthorComment
  flag: boolean
}

export interface IAuthorComment {
  id: number
  username: string
  first_name: string
  last_name: string
  deleted_at?: string
  avatar_url: string
}