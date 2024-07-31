const fs = require("fs/promises");
const path = require("path");

const catchControllerAsync = require("../utils/catch-controller-async");
const BaseController = require("./base.controller");
let _cultivationService = null;
let _cultivation = null;
const { saveBase64Image } = require("../utils/uploadImage");

module.exports = class CultivationController extends BaseController {
  constructor({ CultivationService, Cultivation }) {
    super(CultivationService);
    _cultivationService = CultivationService;
    _cultivation = Cultivation;
  }

  getAllActive = catchControllerAsync(async (req, res) => {
    const { page, limit, active } = req.query;

    await _cultivationService.getAllActive(res, page, limit, active);
  });

  getAllCultivationByCategory = catchControllerAsync(async (req, res) => {
    const { page, limit, categoryId } = req.query;

    await _cultivationService.getAllCultivationByCategory(
      res,
      categoryId,
      page,
      limit
    );
  });

  getOneCultivation = catchControllerAsync(async (req, res) => {
    const { id } = req.query;

    await _cultivationService.getOneCultivation(res, id);
  });

  createCultivation = catchControllerAsync(async (req, res) => {
    const { body } = req;
    try {
      const currentCultivaiton = await _cultivation.findOne({
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
          `cultivation-${Date.now()}`
        );
        body.image = imagePath;
      }

      let response = await _cultivation.create({
        ...body,
        plotSize: String(body.plotSize),
      });
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

  updateCultivation = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;
    try {
      const currentCultivaiton = await _cultivation.findById(id);

      if (body.image && body.image !== currentCultivaiton.image) {
        const imagePath = saveBase64Image(
          body.image,
          `cultivation-${Date.now()}`
        );
        await fs.unlink(path.resolve(currentCultivaiton.image));
        body.image = imagePath;
      }

      let response = await _cultivation.findByIdAndUpdate(
        id,
        {
          ...body,
          plotSize:
            typeof body.plotSize !== "number"
              ? parseFloat(body.plotSize)
              : body.plotSize,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
};
