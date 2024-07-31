const mongoose = require("mongoose");
const { Schema } = mongoose;
const CategoryModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },        
        active: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            required: true,
        },        
    }, {
    timestamps: true,
});

const Category = (module.exports = mongoose.model("Category", CategoryModel));