import { IAbility, Project } from './project';

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  username: string
  avatar_url: string
  github: IGithubUser
  created_at?: string
  updated_at?: string
  delete_at?: string
  last_visited?: string
  role: Role
  ability: IAbility[],
  fakeAvatar: string,
  bio: string,
}

export interface IGithubUser {
  id: number
  login: string
}

export interface Role {
  id: number
  label: string
  color?: string
}

export interface IAbility {
  id: number
  label: string
  color?: string
}