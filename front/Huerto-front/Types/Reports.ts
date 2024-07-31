export interface IAdmin {
  _id: string;
  username: string;
  password: string;
  address: string;
  dateCreated: Date;
  dateOfBirth: Date;
  dni: string;
  email: string;
  parish: string;
  phone: string;
  position: string;
  lastName: string;
  name: string;
  idRole: {
    _id: string;
    name: string;
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CultiveUser {
  name: string;
  originalCultivationName: string;
  datePlantation: Date;
  nextWateringDate: Date;
  status: string;
  location: string;
  userName: string;
  userId: string;
}

export interface CropReport {
  _id: string;
  dateHarvest: string;
  name: string;
  rememberFertiliser: boolean;
  rememberGermination: boolean;
  rememberTransplant: boolean;
  status: string;
  note: string;
  id_user: IDUser;
  id_cultivation: IDCultivation;
}

export interface IDCultivation {
  _id: string;
  name: string;
}

export interface IDUser {
  _id: string;
  dni: string;
  parish: string;
  lastName: string;
  name: string;
  username: string;
}
