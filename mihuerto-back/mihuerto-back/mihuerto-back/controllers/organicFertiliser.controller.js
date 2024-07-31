const fs = require("fs/promises");
const path = require("path");

const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { saveBase64Image } = require("../utils/uploadImage");
let _organicFertiliser = null;

module.exports = class OrganicFertiliserController extends BaseController {
  constructor({ OrganicFertiliserService, OrganicFertiliser }) {
    super(OrganicFertiliserService);
    _organicFertiliser = OrganicFertiliser;
  }
  createOrganicFertiliser = catchControllerAsync(async (req, res) => {
    const { body } = req;
    try {
      const currentCultivaiton = await _organicFertiliser.findOne({
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
      let response = await _organicFertiliser.create(body);
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

  updateOrganicFertiliser = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;
    try {
      const fertiliser = await _organicFertiliser.findById(id);

      if (body.image && body.image !== fertiliser.image) {
        const imagePath = saveBase64Image(
          body.image,
          `fertiliser-${Date.now()}`
        );
        await fs.unlink(path.resolve(fertiliser.image));

        body.image = imagePath;
      }
      let response = await _organicFertiliser.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
};
