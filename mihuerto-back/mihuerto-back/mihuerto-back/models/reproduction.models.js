const mongoose = require("mongoose");
const { Schema } = mongoose;
const ReproductionModel = new Schema(
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

const Reproduction = (module.exports = mongoose.model("Reproduction", ReproductionModel));