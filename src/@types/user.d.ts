import { Project } from './project';

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  github_login: string
  role_id: RoleId
  created_at?: string
  updated_at?: string
  delete_at?: string
  last_visited?: string
  avatar: string
  owner: Project[]
}

export interface RoleId {
  id: number
  label: string
  color?: string
  created_at?: string
  updated_at?: string
}
