import { IAbility, Project } from './project';

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  username: string
  github_login: string
  created_at?: string
  updated_at?: string
  delete_at?: string
  last_visited?: string
  avatar?: string
  role_id: RoleId
  ability: IAbility[]
}

export interface RoleId {
  id: number
  label: string
  color?: string
}

export interface IAbility {
  id: number
  label: string
  color?: string
}