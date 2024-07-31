export interface IRol {
  _id?: string;
  name: string;
  description: string;
  active: boolean;
  submit?: string;
}

export interface Response<T> {
  status: string;
  code: number;
  title: string;
  message: string;
  totalCount: number;
  data: T;
}

export interface Login {
  token: string;
  user: User;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  idRole: Role;
  name?: string;
  lastName?: string;
}

export interface Role {
  _id: string;
  name: string;
}
