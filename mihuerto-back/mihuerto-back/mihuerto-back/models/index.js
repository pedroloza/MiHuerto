const { UserCultivationController } = require("../controllers");

module.exports = {
  Role: require("./role.models"),
  Users: require("./users.models"),
  Category: require("./category.models"),
  Cultivation: require("./cultivation.models"),
  Plague: require("./plague.models"),
  Fertiliser: require("./fertiliser.models"),
  Reproduction: require("./reproduction.models"),
  UserCultivation: require("./userCultivation.models"),
  OrganicFertiliser: require("./organicFertilizers.models"),
};
