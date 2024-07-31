const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");

let _cultivation = null;
let _category = null;
let _authUtils = null;
module.exports = class CultivationService extends BaseService {
  constructor({ Cultivation, Category, AuthUtils }) {
    super(Cultivation);
    _cultivation = Cultivation;
    _category = Category;
    _authUtils = AuthUtils;
  }

  getAll = catchServiceAsync(async (res, limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalCount = await _cultivation.countDocuments();
    const data = await _cultivation.find().populate({
      path: "categoryId",
      select: { name: 1 },
    });

    return handleHttpResponse.success({
      res,
      statusCode: 200,
      totalCount,
      data: { data, totalCount },
    });
  });

  getAllActive = catchServiceAsync(
    async (res, pageNum = 1, limit = 10, active = true) => {
      const pagination = limit * (pageNum - 1);
      const totalCount = await _cultivation.find({ active }).countDocuments();

      const data = await _cultivation
        .aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "categoryId",
              foreignField: "_id",
              as: "categoryData",
            },
          },
          {
            $unwind: "$categoryData",
          },

          // {
          //   $lookup: {
          //     from: "beneficalNeighbours",
          //     localField: "beneficalNeighboursId._id",
          //     foreignField: "_id",
          //     as: "beneficalNeighboursId.beneficalNeighbourData",
          //   },
          // },
          // {
          //   $lookup: {
          //     from: "reproductions",
          //     localField: "reproductionsId._id",
          //     foreignField: "_id",
          //     as: "reproductionsId.reproductionData",
          //   },
          // },
          {
            $lookup: {
              from: "plagues",
              localField: "plaguesId._id",
              foreignField: "_id",
              as: "plaguesId.plagueData",
            },
          },
          {
            $lookup: {
              from: "fertilisers",
              localField: "fertilisersId._id",
              foreignField: "_id",
              as: "fertilisersId.fertiliserData",
            },
          },
          // {
          //   $lookup: {
          //     from: "harmfulNeighbours",
          //     localField: "harmfulNeighboursId._id",
          //     foreignField: "_id",
          //     as: "harmfulNeighboursId.harmfulNeighbourData",
          //   },
          // },
          { $skip: pagination }, // Aplica paginación
          { $limit: Number(limit) }, // Aplica limitación
        ])
        .exec();

      if (data.length === 0) {
        return handleHttpResponse.error({
          res,
          statusCode: 404,
          message: "No se encontrarón datos",
        });
      }

      return handleHttpResponse.success({
        res,
        statusCode: 200,
        totalCount,
        data: { data, totalCount },
      });
    }
  );

  getAllCultivationByCategory = catchServiceAsync(
    async (res, categoryId, pageNum = 1, limit = 10) => {
      const pagination = limit * (pageNum - 1);
      const totalCount = await _cultivation
        .find({ categoryId, active: true })
        .countDocuments();
      //const data = await this.model.find().lean().skip(pagination).limit(limit);
      const data = await _cultivation
        .find({ categoryId, active: true })
        .populate({
          path: "beneficalNeighboursId._id",
          select: { name: 1, description: 1, image: 1 },
        })
        .populate({
          path: "harmfulNeighboursId._id",
          select: { name: 1, description: 1, image: 1 },
        })
        .populate("reproductionsId._id")
        .populate("plaguesId._id")
        .populate("fertilisersId._id");

      if (data.length === 0) {
        return handleHttpResponse.error({
          res,
          statusCode: 404,
          message: "No se encontrarón datos",
        });
      }

      return handleHttpResponse.success({
        res,
        statusCode: 200,
        totalCount,
        data: { data, totalCount },
      });
    }
  );

  getOneCultivation = catchServiceAsync(async (res, id) => {
    if (!id) {
      return handleHttpResponse.error({
        res,
        statusCode: 400,
        message: "No existe el id",
      });
    }

    const data = await _cultivation
      .find({ _id: id })
      .populate({
        path: "beneficalNeighboursId._id",
        select: { name: 1, description: 1, image: 1 },
      })
      .populate({
        path: "harmfulNeighboursId._id",
        select: { name: 1, description: 1, image: 1 },
      })
      .populate("reproductionsId._id")
      .populate("plaguesId._id")
      .populate("fertilisersId._id");

    if (data.length === 0) {
      return handleHttpResponse.error({
        res,
        statusCode: 404,
        message: "No se encontraron resultados",
      });
    }

    return handleHttpResponse.success({ res, statusCode: 200, data: data });
  });
};
