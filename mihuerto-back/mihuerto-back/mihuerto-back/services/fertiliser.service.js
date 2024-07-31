const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");

let _fertiliser = null;
let _authUtils = null;
module.exports = class FertiliserService extends BaseService {
  constructor({ Fertiliser, AuthUtils }) {
    super(Fertiliser);
    _fertiliser = Fertiliser;
    _authUtils = AuthUtils;
  }
};
