export interface ICrop {
  _id?: string;
  name: string;
  description: string;
  image: string;
  scientificName: string;
  active: boolean;
  categoryId: string;
  beneficalNeighboursId: BeneficalNeighboursID[];
  plaguesId: PlaguesID[];
  germinationTime: number;
  harvestTime: number;
  sowingSeason: string;
  solarLight: string;
  plantedAtHome: boolean;
  irrigationAmount: string;
  plotSize: string;
  thermalFloor: string;
  typeOfSoil: string;
  transplantSoil: string;
  temperatureMax: number;
  temperatureMin: number;

  fertilisersId: FertilisersID[];
  harmfulNeighboursId: HarmfulNeighboursID[];
  reproductionsId: ReproductionsID[];
  submit?: string;
}

export interface BeneficalNeighboursID {
  _id?: string;
  beneficalNeighbourId: string;
}

export interface FertilisersID {
  _id?: string;
  fertiliserId: string;
}

export interface HarmfulNeighboursID {
  _id?: string;
  harmfulNeighbourId: string;
}

export interface PlaguesID {
  _id?: string;
  plagueId: string;
}

export interface ReproductionsID {
  _id?: string;
  reproductionId: string;
}
