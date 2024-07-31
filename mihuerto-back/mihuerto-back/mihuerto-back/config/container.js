//Configurar nuestro contenedor de injección de depencia
const { createContainer, asClass, asValue, asFunction } = require("awilix");

//Config
const config = require(".");

//Routes
const Routes = require("../routes");

//Services
const {
  RoleService,
  UsersService,
  CategoryService,
  CultivationService,
  FertiliserService,
  PlagueService,
  ReproductionService,
  UserCultivationService,
  OrganicFertiliserService,
} = require("../services");

//Controllers
const {
  UsersController,
  RoleController,
  CategoryController,
  CultivationController,
  FertiliserController,
  PlagueController,
  ReproductionController,
  OrganicFertiliserController,
  UserCultivationController,
} = require("../controllers");

//Startup
const { Database, Server } = require("../startup");

//Routes
const {
  UsersRoutes,
  RoleRoutes,
  CategoryRoutes,
  CultivationRoutes,
  FertiliserRoutes,
  PlagueRoutes,
  ReproductionRoutes,
  UserCultivationRoutes,
} = require("../routes/api/index");

//Models
const {
  Role,
  Users,
  Category,
  Cultivation,
  Reproduction,
  Plague,
  Fertiliser,
  OrganicFertiliser,
  UserCultivation,
} = require("../models");
const { protect } = require("../middleware/authMiddleware");
const { NotFoundMiddleware } = require("../middleware");
const AuthUtils = require("../utils/auth");
const container = createContainer();
container
  .register({
    //Configuración principal
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    AuthUtils: asClass(AuthUtils).singleton(),
    Database: asClass(Database).singleton(),
    Server: asClass(Server).singleton(),
  })
  .register({
    //Configuración de los servicios
    RoleService: asClass(RoleService).singleton(),
    UsersService: asClass(UsersService).singleton(),
    CategoryService: asClass(CategoryService).singleton(),
    CultivationService: asClass(CultivationService).singleton(),
    FertiliserService: asClass(FertiliserService).singleton(),
    PlagueService: asClass(PlagueService).singleton(),
    ReproductionService: asClass(ReproductionService).singleton(),
    OrganicFertiliserService: asClass(OrganicFertiliserService).singleton(),
    UserCultivationService: asClass(UserCultivationService).singleton(),
  })
  .register({
    //Configuración de los controladores
    UsersController: asClass(UsersController.bind(UsersController)).singleton(),
    RoleController: asClass(RoleController.bind(RoleController)).singleton(),
    CultivationController: asClass(
      CultivationController.bind(CultivationController)
    ).singleton(),
    FertiliserController: asClass(
      FertiliserController.bind(FertiliserController)
    ).singleton(),
    PlagueController: asClass(
      PlagueController.bind(PlagueController)
    ).singleton(),
    ReproductionController: asClass(
      ReproductionController.bind(ReproductionController)
    ).singleton(),
    OrganicFertiliserController: asClass(
      OrganicFertiliserController.bind(OrganicFertiliserController)
    ).singleton(),
    UserCultivationController: asClass(
      UserCultivationController.bind(UserCultivationController)
    ).singleton(),
    CategoryController: asClass(
      CategoryController.bind(CategoryController)
    ).singleton(),
  })
  .register({
    //Configuración de rutas
    UsersRoutes: asFunction(UsersRoutes).singleton(),
    RoleRoutes: asFunction(RoleRoutes).singleton(),
    CategoryRoutes: asFunction(CategoryRoutes).singleton(),
    CultivationRoutes: asFunction(CultivationRoutes).singleton(),
    FertiliserRoutes: asFunction(FertiliserRoutes).singleton(),
    PlagueRoutes: asFunction(PlagueRoutes).singleton(),
    ReproductionRoutes: asFunction(ReproductionRoutes).singleton(),
    UserCultivationRoutes: asFunction(UserCultivationRoutes).singleton(),
  })
  .register({
    //Configuración de modelos
    Role: asValue(Role),
    Users: asValue(Users),
    Category: asValue(Category),
    Cultivation: asValue(Cultivation),
    Reproduction: asValue(Reproduction),
    Plague: asValue(Plague),
    Fertiliser: asValue(Fertiliser),
    OrganicFertiliser: asValue(OrganicFertiliser),
    UserCultivation: asValue(UserCultivation),
  })
  .register({
    //middlewares
    NotFoundMiddleware: asFunction(NotFoundMiddleware).singleton(),
    AuthMiddleware: asFunction(protect).singleton(),
  });
module.exports = container;
