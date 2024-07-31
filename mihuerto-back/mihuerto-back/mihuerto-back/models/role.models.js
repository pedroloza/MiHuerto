const mongoose = require("mongoose");
const { Schema } = mongoose;
const RoleModel = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isMovil: {
            type: Boolean,
            default: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    }, {
    timestamps: true,
});

const Role = (module.exports = mongoose.model("Role", RoleModel));