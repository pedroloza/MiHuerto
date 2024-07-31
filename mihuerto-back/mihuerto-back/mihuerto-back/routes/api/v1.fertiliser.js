const { Router } = require("express");

module.exports = function ({
  FertiliserController,
  OrganicFertiliserController,
  AuthMiddleware,
}) {
  const router = Router();

  router.get("/getAllFertiliser", FertiliserController.getAll);
  router.get(
    "/getAllFertiliserWithoutPagination",
    FertiliserController.getAllWithoutPagination
  );
  router.get("/getOneFertiliser", FertiliserController.getOne);
  router.post("/createFertiliser", FertiliserController.createFertiliser);
  router.patch("/editFertiliser", FertiliserController.updateFertiliser);
  router.post("/removeFertiliser/:id", FertiliserController.delete);

  ///======Organic Fertiliser ========///

  router.get("/getAllOrganicFertiliser", OrganicFertiliserController.getAll);
  router.get(
    "/getAllOrganicFertiliserWithoutPagination",
    OrganicFertiliserController.getAllWithoutPagination
  );
  router.get("/getOneOrganicFertiliser", OrganicFertiliserController.getOne);
  router.post(
    "/createOrganicFertiliser",
    OrganicFertiliserController.createOrganicFertiliser
  );
  router.patch(
    "/editOrganicFertiliser",
    OrganicFertiliserController.updateOrganicFertiliser
  );
  router.post(
    "/removeOrganicFertiliser/:id",
    OrganicFertiliserController.delete
  );

  return router;
};
