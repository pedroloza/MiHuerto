const AppError = require("./app-error");
const handleHttpResponse = require("./handleHttpResponse");

module.exports = (fn) => {
  return async (...args) => {
    const [res] = args; // Desestructuramos los argumentos

    try {
      return await fn(...args);      
    } catch (err) {      
      if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => ({
          field: e.path,
          message: e.message
        }));
        return handleHttpResponse.validation({res, data: errors});      
      }

      throw new AppError(err.message, err.statusCode);
    }
  };
};
