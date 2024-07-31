export const isBrowser = typeof window === "undefined";
export const EXPIRE_TOKEN_ERROR = "La sesión ha expirado";
export const ERROR_MESSAGE = "Oops! Something went wrong!";
export const PARISHES = [
  "Los Esteros",
  "Manta",
  "San Mateo",
  "Tarqui",
  "Eloy Alfaro",
  "San Lorenzo",
  "Santa Marianita",
];

export const initialStateCrop = {
  _id: "",
  name: "",
  description: "",
  image: "",
  scientificName: "",
  active: true,
  categoryId: "",
  beneficalNeighboursId: [],
  plaguesId: [],
  germinationTime: 0,
  harvestTime: 0,
  sowingSeason: "",
  solarLight: "",
  plantedAtHome: false,
  plotSize: "0",
  thermalFloor: "",
  transplantSoil: "",
  irrigationAmount: "",
  temperatureMax: 1,
  temperatureMin: 1,
  typeOfSoil: "",
  fertilisersId: [],
  harmfulNeighboursId: [],
  reproductionsId: [],
  submit: undefined,
};

export const initialCultiveData = {
  _id: "",
  name: "Cultivo 1",
  description: "Cultivo 1",
  image: "",
  scientificName: "Cultivus",
  active: true,
  categoryId: "665b95c17428ab24536a3469",
  beneficalNeighboursId: [
    { _id: "66648788effd6b1b35404d77" },
    { _id: "6664bfc7540b308daa43ec8d" },
  ],
  plaguesId: [{ _id: "66647092effd6b1b35404d6b" }],
  germinationTime: 20,
  harvestTime: 20,
  sowingSeason: "Verano",
  SolarLight: "Mucha",
  plantedAtHome: false,
  plotSize: 10,
  thermalFloor: "Caliente",
  typeOfSoil: "Humedo",
  fertilisersId: ["6664720eeffd6b1b35404d6e"],
  harmfulNeighboursId: [{ _id: "665ba9ab7428ab24536a346a" }],
  reproductionsId: ["66647501effd6b1b35404d72", "666470faeffd6b1b35404d6d"],
  transplantSoil: "Humedo",
  temperatureMax: 30,
  temperatureMin: 10,
};

export const sowingSeasons = [
  "Todas las Estaciones",
  "Verano",
  "Invierno",
  "Otoño",
  "Primavera",
];

export const solarLights = [
  "Mucho sol",
  "Parcialmente con sol",
  "Parcialmente con sombra",
  "Mucha sombra",
];

export const soilTypes = ["Arenoso", "Limoso", "Arcilloso", "Franco"];

export const climateTypes = ["Cálido", "Templado", "Fresco"];

export const transplantSoils = [
  "Suelo Ácido pH 4.5 - 6.5",
  "Suelo Neutro pH 6.5 - 7.5",
  "Suelo Alcalino pH 7.5 - 8.5 ",
];

export const irrigationAmounts = [
  "Todos los días o mucha agua",
  "Cada 3 días o moderada agua",
  "Cada 5 días o poca agua",
];

export const downloadFormats = ["Excel", "CSV"];
