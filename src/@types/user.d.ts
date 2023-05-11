export interface LoginResponse {
  logged: boolean
  pseudo: string
  token: string
  user: IUser
}

export interface IUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  github_login: string,
  role_id: IRole
  created_at?: string,
  updated_at?: string,
  delete_at?: string,
  last_visited?: string,
  avatar: string,
  owner: IOWner[]
}

export interface IRole {
  id: number,
  label: string,
  color: string,
  created_at: string,
  updated_at: string
}

export interface IOWner {
  'id': number,
  'title': string,
  'content': string
  'status': string,
  'created_at?': string,
  'updated_at?': string,
  'delete_at?': string,
}
