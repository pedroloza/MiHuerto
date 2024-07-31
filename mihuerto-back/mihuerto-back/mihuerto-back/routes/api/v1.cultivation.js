const { Router } = require("express");

module.exports = function ({ CultivationController, AuthMiddleware }) {
  const router = Router();

  router.get("/getAllCultivation", CultivationController.getAll);
  router.get("/getAllCultivationActive", CultivationController.getAllActive);
  router.get(
    "/getAllCultivationByCategory",
    CultivationController.getAllCultivationByCategory
  );
  router.get("/getOneCrop", CultivationController.getOne);
  router.get("/getOneCultivation", CultivationController.getOneCultivation);
  router.post("/createCultivation", CultivationController.createCultivation);
  router.patch("/editCultivation", CultivationController.updateCultivation);
  router.post("/removeCultivation/:id", CultivationController.delete);

  return router;
};
