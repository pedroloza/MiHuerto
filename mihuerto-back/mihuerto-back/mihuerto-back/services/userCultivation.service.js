const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");

let _userCultivation = null;
let _user = null;
let _authUtils = null;
module.exports = class UserCultivationService extends BaseService {
  constructor({ UserCultivation, AuthUtils, Users }) {
    super(UserCultivation);
    _user = Users;
    _userCultivation = UserCultivation;
    _authUtils = AuthUtils;
  }

  createUserCultivation = catchServiceAsync(async (res, body) => {
    const response = await _userCultivation.create(body);
    return handleHttpResponse.success({ res, statusCode: 200, data: response });
  });

  getUserCultivationsByUserId = catchServiceAsync(async (userId) => {
    const userCultivations = await _userCultivation
      .find({ id_user: userId })
      .populate("id_user")
      .populate("id_cultivation");

    const results = userCultivations.map((cultivation) => {
      const originalCultivation = cultivation.id_cultivation;

      // Calcular la fecha de plantación desde la fecha de creación del cultivo
      const dateCreated = new Date(cultivation.dateHarvest);
      const dateHarvest = new Date(dateCreated);
      dateHarvest.setDate(
        dateCreated.getDate() + originalCultivation.harvestTime
      );

      const nextWateringDate = new Date();
      const irrigationAmount = originalCultivation.irrigationAmount;

      // Determinar los días a sumar basado en irrigationAmount
      let daysToAdd;
      switch (irrigationAmount) {
        case "Todos los días o mucha agua":
          daysToAdd = 1;
          break;
        case "Cada 3 días o moderada agua":
          daysToAdd = 3;
          break;
        case "Cada 5 días o poca agua":
          daysToAdd = 5;
          break;
        default:
          daysToAdd = 1;
      }

      // Sumar los días a la fecha actual
      nextWateringDate.setDate(nextWateringDate.getDate() + daysToAdd);

      // Calcular el estado del cultivo
      const today = new Date();
      const daysSincePlantation = Math.floor(
        (today - dateCreated) / (1000 * 60 * 60 * 24)
      );
      let status = "Desconocido";
      if (daysSincePlantation < originalCultivation.germinationTime) {
        status = "Germinando";
      } else if (daysSincePlantation < originalCultivation.harvestTime) {
        status = "En crecimiento";
      } else {
        status = "Listo para cosecha";
      }

      return {
        id: cultivation.id,
        image: cultivation.image,
        name: cultivation.name,
        originalCultivationName: originalCultivation.name,
        datePlantation: dateCreated,
        nextWateringDate: nextWateringDate,
        status: status,
        location: cultivation.id_user.parish,
        harvestNumber: `${cultivation.harvestNumber}`,
        numberCultivation: `${cultivation.numberCultivation}`,
        userName: `${cultivation.id_user.name} ${cultivation.id_user.lastName}`,
      };
    });

    return results;
  });

  getAllUserCultivations = catchServiceAsync(async () => {
    const userCultivations = await _userCultivation
      .find()
      .populate("id_user")
      .populate("id_cultivation");

    const results = userCultivations.map((cultivation) => {
      const originalCultivation = cultivation.id_cultivation;

      // Calcular la fecha de plantación desde la fecha de creación del cultivo
      const dateCreated = new Date(cultivation.dateHarvest);
      const dateHarvest = new Date(dateCreated);
      dateHarvest.setDate(
        dateCreated.getDate() + originalCultivation.harvestTime
      );

      const nextWateringDate = new Date();
      const irrigationAmount = originalCultivation.irrigationAmount;

      // Determinar los días a sumar basado en irrigationAmount
      let daysToAdd;
      switch (irrigationAmount) {
        case "Todos los días o mucha agua":
          daysToAdd = 1;
          break;
        case "Cada 3 días o moderada agua":
          daysToAdd = 3;
          break;
        case "Cada 5 días o poca agua":
          daysToAdd = 5;
          break;
        default:
          daysToAdd = 1;
      }

      // Sumar los días a la fecha actual
      nextWateringDate.setDate(nextWateringDate.getDate() + daysToAdd);

      // Calcular el estado del cultivo
      const today = new Date();
      const daysSincePlantation = Math.floor(
        (today - dateCreated) / (1000 * 60 * 60 * 24)
      );
      let status = "Desconocido";
      if (daysSincePlantation < originalCultivation.germinationTime) {
        status = "Germinando";
      } else if (daysSincePlantation < originalCultivation.harvestTime) {
        status = "En crecimiento";
      } else {
        status = "Listo para cosecha";
      }

      return {
        id: cultivation.id,
        image: cultivation.image,
        name: cultivation.name,
        originalCultivationName: originalCultivation.name,
        datePlantation: dateCreated,
        nextWateringDate: nextWateringDate,
        status: status,
        location: cultivation.id_user.parish,
        harvestNumber: `${cultivation.harvestNumber}`,
        numberCultivation: `${cultivation.numberCultivation}`,
        userName: `${cultivation.id_user.name} ${cultivation.id_user.lastName}`,
        userId: cultivation.id_user._id,
      };
    });

    return results;
  });

  getAllCultivesByParish = catchServiceAsync(async () => {
    const result = await _user.aggregate([
      {
        $lookup: {
          from: "usercultivations",
          localField: "_id",
          foreignField: "id_user",
          as: "usercultivations",
        },
      },
      {
        $unwind: "$usercultivations",
      },
      {
        $group: {
          _id: {
            parish: "$parish",
            id_cultivation: "$usercultivations.id_cultivation",
          },
          count: { $sum: 1 },
          usuarios: { $addToSet: "$$ROOT" },
        },
      },
      {
        $group: {
          _id: "$_id.parish",
          cultivosPorCultivationId: {
            $push: {
              id_cultivation: "$_id.id_cultivation",
              count: "$count",
            },
          },
          usuarios: { $first: "$usuarios" },
        },
      },
    ]);

    return result;
  });
};
