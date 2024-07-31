const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserCultivationModel = new Schema({
   dateHarvest: {
      type: Date,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    numberCultivation: {
      type: Number,
      required: true
    },
    harvestNumber: {
      type: Number,
    },
    rememberNextWatering: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      required: true
    },
    note: {
      type: String,
      required: true
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    id_cultivation: {
      type: Schema.Types.ObjectId,
      ref: 'Cultivation',
      required: true
    },
    image: {
      type: String, 
      required: false
    },
    gallery: [{
      type: String 
    }]
  });

const UserCultivation = (module.exports = mongoose.model("UserCultivation", UserCultivationModel));