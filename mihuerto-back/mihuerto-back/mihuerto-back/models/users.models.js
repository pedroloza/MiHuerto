const mongoose = require("mongoose");
const { Schema } = mongoose;


const UsersModel = new Schema(
    {        
        username: {type: String, required: true,},
        password: {type: String, required: true,},
        address: {type: String, required: true,},
        dateCreated: {type: Date, required: true,},        
        dateOfBirth: {type: Date, required: true,},        
        dni: {type: String, default: ''},        
        email: {type: String, default: ''},        
        parish: {type: String, default: ''},     
        phone: {type: String, default: ''},     
        position: {type: String, default: ''},     
        lastName: {type: String, default: ''},
        name: {type: String, required: true,},        
        idRole: {type: Schema.Types.ObjectId, ref: 'Role'},
        active: {type: Boolean, default: true,},
    }, {
    timestamps: true,
});

const Users = (module.exports = mongoose.model("User", UsersModel));