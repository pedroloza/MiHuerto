const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
let _userCultivationService = null;
const { saveBase64Image } = require("../utils/uploadImage");
module.exports = class UserCultivationController extends BaseController {
  constructor({ UserCultivationService }) {
    super(UserCultivationService);
    _userCultivationService = UserCultivationService;
  }

  createUserCultivation = catchControllerAsync(async (req, res) => {
    const { body } = req;
    try {
      // Manejar la imagen principal
      if (body.imagenBase64) {
        const imagePath = saveBase64Image(
          body.imagenBase64,
          `user-cultivation-${Date.now()}`
        );
        body.image = imagePath;
        delete body.imagenBase64;
      }

      // Manejar la galería de imágenes
      if (body.galeriaBase64 && Array.isArray(body.galeriaBase64)) {
        const galeriaPaths = body.galeriaBase64.map((base64, index) => {
          return saveBase64Image(
            base64,
            `user-cultivation-galeria-${Date.now()}-${index}`
          );
        });
        body.gallery = galeriaPaths;
        delete body.galeriaBase64;
      }

      await _userCultivationService.createUserCultivation(res, body);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

  getUserCultivationsByUserId = catchControllerAsync(async (req, res) => {
    const { userId } = req.params;
    const cultivations =
      await _userCultivationService.getUserCultivationsByUserId(userId);
    return res.status(200).json({ success: true, data: cultivations });
  });

  getAllUserCultivations = catchControllerAsync(async (req, res) => {
    const cultivations = await _userCultivationService.getAllUserCultivations();
    return res.status(200).json({ success: true, data: cultivations });
  });

  getAllCultivesByParish = catchControllerAsync(async (req, res) => {
    const cultivations = await _userCultivationService.getAllCultivesByParish();
    return res.status(200).json({ success: true, data: cultivations });
  });

  updateUserCultivation = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;

    const base64Images = [];
    const existingImagePaths = [];
    if (body.galeriaBase64 && Array.isArray(body.galeriaBase64)) {
      body.galeriaBase64.forEach((image) => {
        if (image.startsWith("data:")) {
          base64Images.push(image);
        } else {
          existingImagePaths.push(image);
        }
      });
      let newGalleryPaths = [];
      if (base64Images.length > 0) {
        newGalleryPaths = base64Images.map((base64, index) => {
          return saveBase64Image(
            base64,
            `user-cultivation-galeria-${Date.now()}-${index}`
          );
        });
      }

      // Combinar las imágenes existentes con las nuevas
      body.gallery = [...existingImagePaths, ...newGalleryPaths];
      delete body.galeriaBase64;
    }

    return await this.service.update(res, id, body);
  });
};
