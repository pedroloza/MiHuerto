class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperation = true;
    if (typeof message === 'string') {
      this.message = message;
    } else if (typeof message === 'object') {
      this.message = message;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
