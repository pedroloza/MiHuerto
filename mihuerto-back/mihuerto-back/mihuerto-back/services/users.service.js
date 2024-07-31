const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");
const ObjectId = require("mongodb").ObjectId;

let _users = null;
let _role = null;
let _category = null;
let _cultivation = null;
let _reproduction = null;
let _plague = null;
let _fertiliser = null;
let _organicFertiliser = null;
let _userCultivation = null;
let _authUtils = null;
module.exports = class UsersService extends BaseService {
  constructor({
    Role,
    Users,
    Category,
    Cultivation,
    Reproduction,
    Plague,
    Fertiliser,
    OrganicFertiliser,
    UserCultivation,
    AuthUtils,
  }) {
    super(Users);
    _users = Users;
    _role = Role;
    _category = Category;
    _cultivation = Cultivation;
    _reproduction = Reproduction;
    _plague = Plague;
    _fertiliser = Fertiliser;
    _organicFertiliser = OrganicFertiliser;
    _userCultivation = UserCultivation;
    _authUtils = AuthUtils;
  }

  signIn = catchServiceAsync(async (res, username, password) => {
    const user = await _users
      .findOne({ username })
      .select({
        username: 1,
        password: 1,
        idRole: 1,
        email: 1,
        name: 1,
        lastName: 1,
        active: 1,
      })
      .populate({ path: "idRole", select: { name: 1, isMovil: 1 } });

    if (!user) {
      return handleHttpResponse.error({
        res,
        statusCode: 401,
        message: "Usuario o contraseña incorrecto",
      });
    }

    if (!user.active) {
      return handleHttpResponse.error({
        res,
        statusCode: 401,
        message: "El usuario se encuentra desactivado",
      });
    }

    const isPasswordCorrect = await _authUtils.comparePassword(
      password,
      user.password
    );
    if (!isPasswordCorrect) {
      return handleHttpResponse.error({
        res,
        statusCode: 401,
        message: "Usuario o contraseña incorrecto",
      });
    }

    const token = _authUtils.generateToken(user.id);

    return handleHttpResponse.success({
      res,
      statusCode: 200,
      data: { token, user },
    });
  });

  createUser = catchServiceAsync(async (res, body) => {
    const { username, dni } = body;
    const query = {
      $or: [{ username }, { dni }],
    };

    const user = await _users.findOne(query);
    if (user && user.username === username) {
      return handleHttpResponse.error({
        res,
        statusCode: 400,
        message: "Usuario ya existe",
      });
    }

    if (user && user.dni === dni) {
      return handleHttpResponse.error({
        res,
        statusCode: 400,
        message: "Dni ya existe",
      });
    }

    const userCreated = await _users.create(body);
    if (!userCreated) {
      return handleHttpResponse.error({
        res,
        statusCode: 500,
        message: "No se pudo crear el registro",
      });
    }

    return handleHttpResponse.success({
      res,
      statusCode: 200,
      data: userCreated,
    });
  });

  setState = catchServiceAsync(async (res, id) => {
    const validId = _authUtils.isValidMongoId(id);
    if (!validId) {
      return handleHttpResponse.error({
        res,
        statusCode: 500,
        message: "El Id esta mal formado",
      });
    }

    const user = await _users.findById(id);
    if (!user) {
      return handleHttpResponse.error({
        res,
        statusCode: 404,
        message: "No se encontrarón datos",
      });
    }

    user.active = !user.active;
    const response = await user.save();

    return handleHttpResponse.success({ res, statusCode: 200, data: response });
  });

  getAllUser = catchServiceAsync(
    async (res, limit = 10, pageNum = 1, isMovil = false) => {
      const pagination = limit * (pageNum - 1);
      const rolesWithIsMovil = await _role.find({ isMovil }, "_id");
      const roleIds = rolesWithIsMovil.map((role) => role._id);
      const totalCount = await _users.countDocuments({
        idRole: { $in: roleIds },
      });
      const data = await _users
        .find({ idRole: { $in: roleIds } })
        .populate({ path: "idRole", select: { name: 1, isMovil: 1 } });

      return handleHttpResponse.success({
        res,
        statusCode: 200,
        data: { data, totalCount },
      });
    }
  );

  getDashboard = catchServiceAsync(async (res) => {
    const totalCategories = await _category.countDocuments();
    const totalCultivations = await _cultivation.countDocuments();
    const totalFertilisers = await _fertiliser.countDocuments();
    const totalOrganicFertilisers = await _organicFertiliser.countDocuments();
    const totalPlagues = await _plague.countDocuments();
    const totalReproductions = await _reproduction.countDocuments();
    const totalRoles = await _role.countDocuments();
    const totalUserCultivations = await _userCultivation.countDocuments();
    const totalUsers = await _users.countDocuments();

    return {
      totalCategories,
      totalCultivations,
      totalFertilisers,
      totalOrganicFertilisers,
      totalPlagues,
      totalReproductions,
      totalRoles,
      totalUserCultivations,
      totalUsers,
    };
  });

  getAdministrators = catchServiceAsync(async (res) => {
    const rolesWithIsMovil = await _role.find({ isMovil: false }, "_id");
    const roleIds = rolesWithIsMovil.map((role) => role._id);
    const totalCount = await _users.countDocuments({
      idRole: { $in: roleIds },
    });
    const data = await _users
      .find({ idRole: { $in: roleIds } })
      .populate({ path: "idRole", select: { name: 1, isMovil: 1 } });

    return data;
  });

  getCultivationByUserCultivation = catchServiceAsync(async (idCultivation) => {
    const cultivation = await _userCultivation
      .find({ id_cultivation: new ObjectId(idCultivation) })
      .select("-image -gallery")
      .populate({
        path: "id_user",
        select: {
          dni: 1,
          name: 1,
          lastName: 1,
          parish: 1,
          username: 1,
        },
      })
      .populate({ path: "id_cultivation", select: { name: 1 } });

    return cultivation;
  });

  getFullUser = catchServiceAsync(async (res, id) => {
    if (!id) {
      return handleHttpResponse.error({
        res,
        statusCode: 400,
        message: "No existe el id",
      });
    }
    const currentEntity = await _users
      .findById(id)
      .select("-password")
      .populate("idRole");
    if (!currentEntity) {
      return handleHttpResponse.error({
        res,
        statusCode: 404,
        message: "No se encontro al usuario",
      });
    }

    return handleHttpResponse.success({
      res,
      statusCode: 200,
      data: currentEntity,
    });
  });
};
