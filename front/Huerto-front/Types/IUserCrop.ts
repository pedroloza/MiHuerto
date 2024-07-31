export interface IUserCrop {
  image: string;
  userCultivationName: string;
  originalCultivationName: string;
  datePlantation: Date;
  nextWateringDate: Date;
  status: string;
  location: string;
  userName: string;
  name?: string;
  harvestNumber?: number;
  numberCultivation?: number;
}
