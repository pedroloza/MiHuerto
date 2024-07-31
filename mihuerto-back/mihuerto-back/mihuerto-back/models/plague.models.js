const mongoose = require("mongoose");
const { Schema } = mongoose;
const PlagueModel = new Schema(
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

const Plague = (module.exports = mongoose.model("Plague", PlagueModel));