const { Router } = require("express");

module.exports = function ({ UsersController, AuthMiddleware }) {
  const router = Router();

  router.post("/signIn", UsersController.signIn);
  router.post("/createUser", UsersController.createUser);

  router.use(AuthMiddleware);

  router.patch("/editUser", UsersController.update);
  router.patch("/editState", UsersController.setState);
  router.get("/getAllUsers", UsersController.getAllUser);
  router.get("/getOneUser", UsersController.getOne);
  //Resporst
  router.get("/dashboard", UsersController.getDashboard);
  router.get("/administrators", UsersController.getAdministrators);
  router.post(
    "/getCultivationByUserCultivation",
    UsersController.getCultivationByUserCultivation
  );
  router.get("/me", UsersController.getMe, UsersController.getFullUser);

  return router;
};
