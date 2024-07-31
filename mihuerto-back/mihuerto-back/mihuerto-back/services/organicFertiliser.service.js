const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");

let _organicFertiliser = null;
let _authUtils = null;
module.exports = class OrganicFertiliserService extends BaseService {
  constructor({ OrganicFertiliser, AuthUtils }) {
    super(OrganicFertiliser);
    _organicFertiliser = OrganicFertiliser;
    _authUtils = AuthUtils;
  }
};
