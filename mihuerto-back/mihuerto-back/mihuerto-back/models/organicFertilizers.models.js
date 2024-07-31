const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrganicFertiliserModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    }, {
    timestamps: true,
});

const OrganicFertiliser = (module.exports = mongoose.model("OrganicFertiliser", OrganicFertiliserModel));