const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
let _roleService = null;

module.exports = class RoleController extends BaseController {
  constructor({ RoleService }) {
    super(RoleService);
    _roleService = RoleService;    
  }    
  

  getRolesActives = catchControllerAsync(async (req, res) => {        
    const active = true;

    await _roleService.getRolesActives(res, active);          
  });


  createRole = catchControllerAsync(async (req, res) => {        
    const { body } = req;

    await _roleService.createRole(res, body);          
  });

  editStateRole = catchControllerAsync(async (req, res) => {
    const { id } = req.query;    

    await _roleService.editStateRole(res, id);          
  });  


};
