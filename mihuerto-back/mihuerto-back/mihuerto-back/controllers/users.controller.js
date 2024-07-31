const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
let _usersService = null;
let _role = null;

module.exports = class UsersController extends BaseController {
  constructor({ UsersService, Role }) {
    super(UsersService);
    _usersService = UsersService;
    _role = Role;
  }

  createUser = catchControllerAsync(async (req, res) => {
    const { body } = req;

    await _usersService.createUser(res, body);
  });

  signIn = catchControllerAsync(async (req, res) => {
    const { username, password } = req.body;

    await _usersService.signIn(res, username, password);
  });

  setState = catchControllerAsync(async (req, res) => {
    const { id } = req.query;

    await _usersService.setState(res, id);
  });

  getAllUser = catchControllerAsync(async (req, res) => {
    const { page, limit, isMovil } = req.query;

    await _usersService.getAllUser(res, limit, page, isMovil);
  });

  //Reports
  getDashboard = catchControllerAsync(async (req, res) => {
    const dashboard = await _usersService.getDashboard();
    return res.status(200).json({ success: true, data: dashboard });
  });

  getAdministrators = catchControllerAsync(async (req, res) => {
    const administrators = await _usersService.getAdministrators();
    return res.status(200).json({ success: true, data: administrators });
  });

  getCultivationByUserCultivation = catchControllerAsync(async (req, res) => {
    const { idCultivation } = req.query;
    const cultivation = await _usersService.getCultivationByUserCultivation(
      idCultivation
    );
    return res.status(200).json({ success: true, data: cultivation });
  });

  getMe = catchControllerAsync(async (req, res, next) => {
    const user = req.user;

    req.query.id = user._id;

    next();
  });

  getFullUser = catchControllerAsync(async (req, res) => {
    const { id } = req.query;

    return await _usersService.getFullUser(res, id);
  });
};
