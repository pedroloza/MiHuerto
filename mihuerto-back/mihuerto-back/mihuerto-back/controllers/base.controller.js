const catchControllerAsync = require("../utils/catch-controller-async");

module.exports = class BaseController {
  constructor(service) {
    this.service = service;
  }

  getOne = catchControllerAsync(async (req, res) => {
    const { id } = req.query;

    return await this.service.getOne(res, id);
  });

  getAll = catchControllerAsync(async (req, res) => {
    const { page, limit } = req.query;

    return await this.service.getAll(res, limit, page);
  });

  getAllWithoutPagination = catchControllerAsync(async (req, res) => {
    return await this.service.getAllWithoutPagination(res);
  });

  create = catchControllerAsync(async (req, res) => {
    const { body } = req;

    return await this.service.create(res, body);
  });

  update = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;
    return await this.service.update(res, id, body);
  });

  delete = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const result = await this.service.delete(id);
    return res.send(result);
  });
};
