const mongoose = require("mongoose");
const { Schema } = mongoose;
const CultivationModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    germinationTime: {
      type: Number,
      required: true,
    },
    harvestTime: {
      type: Number,
      required: true,
    },
    sowingSeason: {
      type: String,
      required: true,
    },
    solarLight: {
      type: String,
      required: true,
    },
    plantedAtHome: {
      type: Boolean,
      default: false,
    },
    plotSize: {
      type: String,
      required: true,
    },
    thermalFloor: {
      type: String,
      required: true,
    },
    typeOfSoil: {
      type: String,
      required: true,
    },
    transplantSoil: {
      type: String,
      required: true,
    },
    temperatureMax: {
      type: Number,
      required: true,
    },
    irrigationAmount: {
      type: String,
      required: true,
    },
    temperatureMin: { type: Number, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    beneficalNeighboursId: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Cultivation",
        },
        name: {
          type: String,
        },
      },
    ],
    harmfulNeighboursId: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Cultivation" },
        name: {
          type: String,
        },
      },
    ],
    reproductionsId: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Reproduction" },
        name: {
          type: String,
        },
      },
    ],
    plaguesId: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Plague" },
        name: {
          type: String,
        },
      },
    ],
    fertilisersId: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Fertiliser" },
        name: {
          type: String,
        },
      },
    ],
    organicFertilisersId: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "OrganicFertiliser" },
        name: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cultivation = (module.exports = mongoose.model(
  "Cultivation",
  CultivationModel
));
