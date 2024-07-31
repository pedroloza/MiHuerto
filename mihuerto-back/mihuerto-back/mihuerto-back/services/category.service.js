const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");

let _category = null;
let _authUtils = null;
module.exports = class CategoryService extends BaseService {
  constructor({ Category, AuthUtils }) {
    super(Category);
    _category = Category;
    _authUtils = AuthUtils;
  }

  getAllActive = catchServiceAsync(
    async (res, pageNum = 1, limit = 10, active = true) => {
      const pagination = limit * (pageNum - 1);
      const totalCount = await _category.find({ active }).countDocuments();
      const categories = await _category.aggregate([
        { $match: { active: true } }, // Filtra por categorías activas
        {
          $lookup: {
            from: "cultivations", // Nombre de la colección de cultivos
            let: { categoryId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$categoryId", "$$categoryId"] },
                      { $eq: ["$active", true] },
                    ],
                  },
                },
              },
            ],
            as: "cultivations",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            description: 1,
            active: 1,
            countCultivations: { $size: "$cultivations" },
            image: 1,
          },
        },
        { $skip: pagination }, // Aplica paginación
        { $limit: Number(limit) }, // Aplica limitación
      ]);

      if (categories.length === 0) {
        return handleHttpResponse.error({
          res,
          statusCode: 404,
          message: "No se encontrarón datos",
        });
      }

      return handleHttpResponse.success({
        res,
        statusCode: 200,
        data: { categories, totalCount },
      });
    }
  );
};
