const fs = require("fs/promises");
const path = require("path");

const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { saveBase64Image } = require("../utils/uploadImage");
let _fertiliserService = null;
let _fertiliser = null;
module.exports = class FertiliserController extends BaseController {
  constructor({ FertiliserService, Fertiliser }) {
    super(FertiliserService);
    _fertiliserService = FertiliserService;
    _fertiliser = Fertiliser;
  }

  createFertiliser = catchControllerAsync(async (req, res) => {
    const { body } = req;
    try {
      const currentCultivaiton = await _fertiliser.findOne({
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
          `fertiliser-${Date.now()}`
        );
        body.image = imagePath;
      }
      let response = await _fertiliser.create(body);
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

  updateFertiliser = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;
    try {
      const fertiliser = await _fertiliser.findById(id);

      if (body.image && body.image !== fertiliser.image) {
        const imagePath = saveBase64Image(
          body.image,
          `fertiliser-${Date.now()}`
        );
        await fs.unlink(path.resolve(fertiliser.image));

        body.image = imagePath;
      }
      let response = await _fertiliser.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
};
