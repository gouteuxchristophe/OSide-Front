import { IAbility, Project } from './project';

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  username: string
  github: IGithubUser
  created_at?: string
  updated_at?: string
  delete_at?: string
  last_visited?: string
  role: RoleId
  ability: IAbility[],
  fakeAvatar: string
}

export interface IGithubUser {
  id: number
  login: string
  avatar_url: string
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