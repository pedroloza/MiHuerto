const mongoose = require("mongoose");
const { Schema } = mongoose;
const FertiliserModel = new Schema(
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

const Fertiliser = (module.exports = mongoose.model("Fertiliser", FertiliserModel));