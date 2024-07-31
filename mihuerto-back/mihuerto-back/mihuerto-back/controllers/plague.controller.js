const fs = require("fs/promises");
const path = require("path");

const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
const { saveBase64Image } = require("../utils/uploadImage");
let _plagueService = null;
let _plague = null;
module.exports = class PlagueController extends BaseController {
  constructor({ PlagueService, Plague }) {
    super(PlagueService);
    _plagueService = PlagueService;
    _plague = Plague;
  }

  createPlague = catchControllerAsync(async (req, res) => {
    const { body } = req;
    try {
      const currentCultivaiton = await _plague.findOne({
        name: body.name,
      });
      if (currentCultivaiton) {
        return res
          .status(500)
          .json({ success: false, message: "El recurso ya existe" });
      }

      if (body.image) {
        const imagePath = saveBase64Image(body.image, `plague-${Date.now()}`);
        body.image = imagePath;
      }
      let response = await _plague.create(body);
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

  updatePlague = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;
    try {
      const plague = await _plague.findById(id);

      if (body.image && body.image !== plague.image) {
        const imagePath = saveBase64Image(body.image, `plague-${Date.now()}`);
        await fs.unlink(path.resolve(plague.image));

        body.image = imagePath;
      }
      let response = await _plague.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
};
