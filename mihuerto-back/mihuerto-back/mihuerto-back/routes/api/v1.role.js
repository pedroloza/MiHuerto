const { Router } = require("express");

module.exports = function ({ RoleController, AuthMiddleware }) {
  const router = Router();
      
  router.get("/getAllRoles", RoleController.getAll);  
  router.get("/getRolesActives", RoleController.getRolesActives);  
  router.patch("/editStateRole", RoleController.editStateRole);  
  router.post("/createRole", RoleController.createRole);
  router.patch("/editRole", RoleController.update);  
  router.get("/getOneRole", RoleController.getOne);  

  return router;
};