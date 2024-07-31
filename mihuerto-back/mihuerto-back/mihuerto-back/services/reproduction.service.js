const BaseService = require("./base.service");

let _reproduction = null;
module.exports = class ReproductionService extends BaseService {
  constructor({ Reproduction }) {
    super(Reproduction);
    _reproduction = Reproduction;
  }
};
