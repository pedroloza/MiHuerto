const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");

let _role = null;
let _authUtils = null;
module.exports = class RoleService extends BaseService {
  constructor({ Role, AuthUtils }) {
    super(Role);
    _role = Role;    
    _authUtils = AuthUtils;
  }  


  getRolesActives = catchServiceAsync(async (res, active) => {
    const roles = await _role.find({active}).select({ _id: 1, name: 1, description: 1 });

    if (roles.length === 0) {            
      return handleHttpResponse.error({res, statusCode: 404, message: 'No se encontrarón datos'});      
    }    

    return handleHttpResponse.success({res, statusCode: 200, data: roles});          
  });

  createRole = catchServiceAsync(async (res, body) => {    
    const {name} = body;            
    
    const role = await _role.findOne({name});           
    if (role) {            
      return handleHttpResponse.error({res, statusCode: 400, message: 'Rol ya existe'});      
    }            
        
    const roleCreated = await _role.create(body);
    if (!roleCreated){
      return handleHttpResponse.error({res, statusCode: 500, message: 'No se pudo crear el registro'});      
    }

    return handleHttpResponse.success({res, statusCode: 200, data: roleCreated});          
  });
  
  editStateRole = catchServiceAsync(async (res, id) => { 
    const validId = _authUtils.isValidMongoId(id); 
    if(!validId){
      return handleHttpResponse.error({res, statusCode: 500, message: 'El Id esta mal formado'});      
    }
    
    const role = await _role.findById(id);            
    if (!role) {
      return handleHttpResponse.error({res, statusCode: 404, message: 'No se encontrarón datos'});      
    }
        
    role.active = !role.active;    
    const response = await role.save();

    return handleHttpResponse.success({res, statusCode: 200, data: response});          
  });
  
};
