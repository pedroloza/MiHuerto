const fs = require("fs/promises");
const path = require("path");

const catchControllerAsync = require("../utils/catch-controller-async");
const { success } = require("../utils/handleHttpResponse");
const BaseController = require("./base.controller");
const { saveBase64Image } = require("../utils/uploadImage");

let _categoryService = null;
let _categories = null;
module.exports = class CategoryController extends BaseController {
  constructor({ CategoryService, Category }) {
    super(CategoryService);
    _categoryService = CategoryService;
    _categories = Category;
  }

  getAllActive = catchControllerAsync(async (req, res) => {
    const { page, limit, active } = req.query;

    await _categoryService.getAllActive(res, page, limit, active);
  });

  createCategories = catchControllerAsync(async (req, res) => {
    const { body } = req;
    try {
      const currentCultivaiton = await _categories.findOne({
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
          `categories-${Date.now()}`
        );
        body.image = imagePath;
      }
      let response = await _categories.create(body);
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

  updateCategories = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.query;
    try {
      const currentCategory = await _categories.findById(id);

      if (body.image && body.image !== currentCategory.image) {
        const imagePath = saveBase64Image(
          body.image,
          `categories-${Date.now()}`
        );
        await fs.unlink(path.resolve(currentCategory.image));
        body.image = imagePath;
      }
      let response = await _categories.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
};
