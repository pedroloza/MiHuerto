const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
    // stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler