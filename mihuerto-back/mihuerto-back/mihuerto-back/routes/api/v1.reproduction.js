const { Router } = require("express");

module.exports = function ({ ReproductionController, AuthMiddleware }) {
  const router = Router();

  router.get("/getAllReproductions", ReproductionController.getAll);
  router.get("/getOneReproduction", ReproductionController.getOne);
  router.post("/createReproduction", ReproductionController.createReproduction);
  router.patch("/editReproduction", ReproductionController.updateReproduction);
  router.post("/removeReproduction/:id", ReproductionController.delete);

  return router;
};
