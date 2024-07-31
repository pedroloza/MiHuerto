const catchServiceAsync = require("../utils/catch-service-async");
const BaseService = require("./base.service");
const AppError = require("../utils/app-error");
const handleHttpResponse = require("../utils/handleHttpResponse");

let _plague = null;
let _authUtils = null;
module.exports = class PlagueService extends BaseService {
  constructor({ Plague, AuthUtils }) {
    super(Plague);
    _plague = Plague;    
    _authUtils = AuthUtils;
  }  


  
};
