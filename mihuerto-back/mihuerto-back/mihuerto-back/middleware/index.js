module.exports = {
  ErrorMiddleware: require("./errorMiddleware"),
  NotFoundMiddleware: require("./notFoundMiddleware"),
  AuthMiddleware: require("./authMiddleware").protect,
};
