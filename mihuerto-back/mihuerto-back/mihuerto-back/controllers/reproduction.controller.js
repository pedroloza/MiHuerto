const fs = require("fs/promises");
const path = require("path");

const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { saveBase64Image } = require("../utils/uploadImage");

let _reproductionService = null;
let _reproduction = null;

module.exports = class ReproductionController extends BaseController {
  constructor({ ReproductionService, Reproduction }) {
    super(ReproductionService);
    _reproductionService = ReproductionService;
    _reproduction = Reproduction;
  }

  createReproduction = catchControllerAsync(async (req, res) => {
    const { body } = req;
    try {
      const currentCultivaiton = await _reproduction.findOne({
        name: body.name,
      });
      if (currentCultivaiton) {
        return res
          .status(500)
          .json({ success: false, message: "El recurso ya existe" });
      }

      if (body.image) {
        const imagePath = saveBase64Image(
          body.image,
          `reproduction-${Date.now()}`
        );
        body.image = imagePath;
      }
      let response = await _reproduction.create(body);
      return res.json({ success: true, data: response });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  });

  updateReproduction = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;
    try {
      const reproduction = await _reproduction.findById(id);

      if (body.image && body.image !== reproduction.image) {
        const imagePath = saveBase64Image(
          body.image,
          `reproduction-${Date.now()}`
        );

        await fs.unlink(path.resolve(reproduction.image));

        body.image = imagePath;
      }
      let response = await _reproduction.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return res.json({ success: true, data: response });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  });
};
