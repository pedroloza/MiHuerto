const { Router } = require("express");

module.exports = function ({ PlagueController, AuthMiddleware }) {
  const router = Router();

  router.get("/getAllPlague", PlagueController.getAll);
  router.get("/getOnePlague", PlagueController.getOne);
  router.post("/createPlague", PlagueController.createPlague);
  router.patch("/editPlague", PlagueController.updatePlague);
  router.post("/removePlague/:id", PlagueController.delete);

  return router;
};
