const { Router } = require("express");

module.exports = function ({ CategoryController, AuthMiddleware }) {
  const router = Router();

  router.get("/getAllCategory", CategoryController.getAll);
  router.get("/getAllCategoryActive", CategoryController.getAllActive);
  router.get("/getOneCategory", CategoryController.getOne);
  router.post("/createCategory", CategoryController.createCategories);
  router.patch("/editCategory", CategoryController.updateCategories);
  router.post("/removeCategory/:id", CategoryController.delete);

  return router;
};
