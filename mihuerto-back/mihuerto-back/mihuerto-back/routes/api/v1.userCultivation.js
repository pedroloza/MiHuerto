const { Router } = require("express");

module.exports = function ({ UserCultivationController, AuthMiddleware }) {
  const router = Router();

  router.post("/create", UserCultivationController.createUserCultivation);
  router.get("/getOneUserCultivation/", UserCultivationController.getOne);
  router.get(
    "/list/:userId",
    UserCultivationController.getUserCultivationsByUserId
  );
  router.get("/list-report", UserCultivationController.getAllUserCultivations);
  router.get(
    "/getAllCultivesByParish",
    UserCultivationController.getAllCultivesByParish
  );
  router.patch(
    "/updateUserCultivation",
    UserCultivationController.updateUserCultivation
  );
  router.delete("/deleteUserCultivation/:id", UserCultivationController.delete);
  return router;
};
