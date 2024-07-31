const AppError = require("../utils/app-error");
const catchServiceAsync = require("../utils/catch-service-async");
const handleHttpResponse = require("../utils/handleHttpResponse");

const fs = require("fs/promises");
const path = require("path");

module.exports = class BaseService {
  constructor(model) {
    this.model = model;
  }

  getOne = catchServiceAsync(async (res, id) => {
    if (!id) {
      return handleHttpResponse.error({
        res,
        statusCode: 400,
        message: "No existe el id",
      });
    }
    const currentEntity = await this.model.findById(id);
    if (!currentEntity) {
      return handleHttpResponse.error({
        res,
        statusCode: 404,
        message: "No se encontraron resultados",
      });
    }

    return handleHttpResponse.success({
      res,
      statusCode: 200,
      data: currentEntity,
    });
  });

  getAll = catchServiceAsync(async (res, limit = 10, pageNum = 1) => {
    const pagination = limit * (pageNum - 1);
    const totalCount = await this.model.countDocuments();
    const data = await this.model.find();

    return handleHttpResponse.success({
      res,
      statusCode: 200,
      totalCount,
      data: { data, totalCount },
    });
  });

  getAllWithoutPagination = catchServiceAsync(async (res) => {
    const data = await this.model.find();

    return handleHttpResponse.success({
      res,
      statusCode: 200,
      data: { data },
    });
  });

  create = catchServiceAsync(async (res, entity) => {
    const data = await this.model.create(entity);

    return handleHttpResponse.success({ res, statusCode: 200, data: data });
  });

  update = catchServiceAsync(async (res, id, entity) => {
    try {
      if (!id) {
        return handleHttpResponse.error({
          res,
          statusCode: 400,
          message: "No existe el id",
        });
      }

      const data = await this.model.findByIdAndUpdate(id, entity, {
        new: true,
      });

      return handleHttpResponse.success({ res, statusCode: 200, data: data });
    } catch (e) {
      return handleHttpResponse.error({
        res,
        statusCode: 500,
        message: "No existe el id o esta mal formado",
      });
    }
  });

  delete = catchServiceAsync(async (id) => {
    if (!id) {
      throw new AppError("Id must be sent", 400);
    }

    const res = await this.model.findByIdAndDelete(id);
    // if (res && res?.image) await fs.unlink(path.resolve(res.image));
    return res;
  });
};
