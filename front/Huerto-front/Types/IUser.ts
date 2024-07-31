import { Role } from "./Types";

export interface UserProps {
  _id?: string;
  username: string;
  password: string;
  name: string;
  lastName: string;
  dni: string;
  address: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  position: string;
  parish: string;
  idRole: any;
  active: boolean;
  submit?: string;
}
