const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { ErrorMiddleware } = require("../middleware");
const notFoundMiddleware = require("../middleware/notFoundMiddleware");
// const swaggerUI = require("swagger-ui-express");
//const authMiddleware = require("../middlewares/auth.middleware");
// const { SWAGGER_PATH } = require("../config");
//const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({
  UsersRoutes,
  RoleRoutes,
  CategoryRoutes,
  CultivationRoutes,
  FertiliserRoutes,
  PlagueRoutes,
  UserCultivationRoutes,
  ReproductionRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  apiRouter
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }));
  apiRouter.use("/user", UsersRoutes);
  apiRouter.use("/role", RoleRoutes);
  apiRouter.use("/category", CategoryRoutes);
  apiRouter.use("/cultivation", CultivationRoutes);
  apiRouter.use("/user-cultivation", UserCultivationRoutes);
  apiRouter.use("/fertiliser", FertiliserRoutes);
  apiRouter.use("/plague", PlagueRoutes);
  apiRouter.use("/reproduction", ReproductionRoutes);

  router.use("/v1/api", apiRouter);

  router.use("/version", (req, res) => {
    res.send("v.0.1.0.3 Prueba2");
  });
  router.use(notFoundMiddleware);
  //router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  // router.use(ErrorMiddleware);

  return router;
};
